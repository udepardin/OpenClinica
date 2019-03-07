/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BookComponentsPage, BookDeleteDialog, BookUpdatePage } from './book.page-object';

const expect = chai.expect;

describe('Book e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let bookUpdatePage: BookUpdatePage;
    let bookComponentsPage: BookComponentsPage;
    let bookDeleteDialog: BookDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Books', async () => {
        await navBarPage.goToEntity('book');
        bookComponentsPage = new BookComponentsPage();
        await browser.wait(ec.visibilityOf(bookComponentsPage.title), 5000);
        expect(await bookComponentsPage.getTitle()).to.eq('openClinicaApp.book.home.title');
    });

    it('should load create Book page', async () => {
        await bookComponentsPage.clickOnCreateButton();
        bookUpdatePage = new BookUpdatePage();
        expect(await bookUpdatePage.getPageTitle()).to.eq('openClinicaApp.book.home.createOrEditLabel');
        await bookUpdatePage.cancel();
    });

    it('should create and save Books', async () => {
        const nbButtonsBeforeCreate = await bookComponentsPage.countDeleteButtons();

        await bookComponentsPage.clickOnCreateButton();
        await promise.all([
            bookUpdatePage.setTitleInput('title'),
            bookUpdatePage.setDescriptionInput('description'),
            bookUpdatePage.setPublicationDateInput('2000-12-31'),
            bookUpdatePage.setPriceInput('5'),
            bookUpdatePage.authorSelectLastOption()
        ]);
        expect(await bookUpdatePage.getTitleInput()).to.eq('title');
        expect(await bookUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await bookUpdatePage.getPublicationDateInput()).to.eq('2000-12-31');
        expect(await bookUpdatePage.getPriceInput()).to.eq('5');
        await bookUpdatePage.save();
        expect(await bookUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await bookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Book', async () => {
        const nbButtonsBeforeDelete = await bookComponentsPage.countDeleteButtons();
        await bookComponentsPage.clickOnLastDeleteButton();

        bookDeleteDialog = new BookDeleteDialog();
        expect(await bookDeleteDialog.getDialogTitle()).to.eq('openClinicaApp.book.delete.question');
        await bookDeleteDialog.clickOnConfirmButton();

        expect(await bookComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
