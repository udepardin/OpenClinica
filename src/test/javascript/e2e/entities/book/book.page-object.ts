import { element, by, ElementFinder } from 'protractor';

export class BookComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-book div table .btn-danger'));
    title = element.all(by.css('jhi-book div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class BookUpdatePage {
    pageTitle = element(by.id('jhi-book-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    descriptionInput = element(by.id('field_description'));
    publicationDateInput = element(by.id('field_publicationDate'));
    priceInput = element(by.id('field_price'));
    authorSelect = element(by.id('field_author'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setPublicationDateInput(publicationDate) {
        await this.publicationDateInput.sendKeys(publicationDate);
    }

    async getPublicationDateInput() {
        return this.publicationDateInput.getAttribute('value');
    }

    async setPriceInput(price) {
        await this.priceInput.sendKeys(price);
    }

    async getPriceInput() {
        return this.priceInput.getAttribute('value');
    }

    async authorSelectLastOption() {
        await this.authorSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async authorSelectOption(option) {
        await this.authorSelect.sendKeys(option);
    }

    getAuthorSelect(): ElementFinder {
        return this.authorSelect;
    }

    async getAuthorSelectedOption() {
        return this.authorSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class BookDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-book-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-book'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
