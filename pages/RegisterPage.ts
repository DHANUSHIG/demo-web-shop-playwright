import { Locator, Page } from "@playwright/test";

export class RegisterPage {
    readonly page: Page;

    readonly RegisterPage: Locator;
    readonly GenderMale: Locator;
    readonly GenderFemale: Locator;
    readonly FirstName: Locator;
    readonly LastName: Locator;
    readonly Email: Locator;
    readonly Password: Locator;
    readonly ConfirmPassword: Locator;
    readonly RegisterButton: Locator;
    readonly emailExistsError: Locator;
    readonly confirmPasswordError: Locator;
    readonly firstNameRequiredError: Locator;
    readonly lastNameRequiredError: Locator;
    readonly emailRequiredError: Locator;
    readonly passwordRequiredError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.RegisterPage = page.getByRole('link', { name: 'Register' });
        this.GenderMale = page.locator('#gender-male');
        this.GenderFemale = page.locator('#gender-female');
        this.FirstName = page.getByRole('textbox', { name: 'First name' });
        this.LastName = page.getByRole('textbox', { name: 'Last name' });
        this.Email = page.getByRole('textbox', { name: 'Email' });
        this.Password = page.locator('#Password');
        this.ConfirmPassword = page.locator('#ConfirmPassword');
        this.RegisterButton = page.getByRole('button', { name: 'Register' });
        this.emailExistsError = page.locator('.validation-summary-errors');
        this.confirmPasswordError = page.locator('span[data-valmsg-for="ConfirmPassword"]');
        this.firstNameRequiredError = page.locator('span[data-valmsg-for="FirstName"]');
        this.lastNameRequiredError = page.locator('span[data-valmsg-for="LastName"]');
        this.emailRequiredError = page.locator('span[data-valmsg-for="Email"]');
        this.passwordRequiredError = page.locator('span[data-valmsg-for="Password"]');
    }

    async Register(firstname: string, lastname: string, email: string, password: string, confirmPassword: string) {
        await this.RegisterPage.click();
        await this.GenderMale.check();
        await this.FirstName.fill(firstname);
        await this.LastName.fill(lastname);
        await this.Email.fill(email);
        await this.Password.fill(password);
        await this.ConfirmPassword.fill(confirmPassword);
        await this.RegisterButton.click();
    }
}
