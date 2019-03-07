/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AuthorComponentsPage, AuthorDeleteDialog, AuthorUpdatePage } from './author.page-object';

const expect = chai.expect;

describe('Author e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let authorUpdatePage: AuthorUpdatePage;
    let authorComponentsPage: AuthorComponentsPage;
    let authorDeleteDialog: AuthorDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Authors', async () => {
        await navBarPage.goToEntity('author');
        authorComponentsPage = new AuthorComponentsPage();
        await browser.wait(ec.visibilityOf(authorComponentsPage.title), 5000);
        expect(await authorComponentsPage.getTitle()).to.eq('openClinicaApp.author.home.title');
    });

    it('should load create Author page', async () => {
        await authorComponentsPage.clickOnCreateButton();
        authorUpdatePage = new AuthorUpdatePage();
        expect(await authorUpdatePage.getPageTitle()).to.eq('openClinicaApp.author.home.createOrEditLabel');
        await authorUpdatePage.cancel();
    });

    it('should create and save Authors', async () => {
        const nbButtonsBeforeCreate = await authorComponentsPage.countDeleteButtons();

        await authorComponentsPage.clickOnCreateButton();
        await promise.all([authorUpdatePage.setNameInput('name'), authorUpdatePage.setBirthDateInput('2000-12-31')]);
        expect(await authorUpdatePage.getNameInput()).to.eq('name');
        expect(await authorUpdatePage.getBirthDateInput()).to.eq('2000-12-31');
        await authorUpdatePage.save();
        expect(await authorUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await authorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Author', async () => {
        const nbButtonsBeforeDelete = await authorComponentsPage.countDeleteButtons();
        await authorComponentsPage.clickOnLastDeleteButton();

        authorDeleteDialog = new AuthorDeleteDialog();
        expect(await authorDeleteDialog.getDialogTitle()).to.eq('openClinicaApp.author.delete.question');
        await authorDeleteDialog.clickOnConfirmButton();

        expect(await authorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
