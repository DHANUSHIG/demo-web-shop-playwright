import { Locator, Page } from "@playwright/test";
import { RandomData } from "../utils/RandomData";

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

    constructor(page: Page) {
        this.page = page;
        this.RegisterPage =  page.getByRole('link', { name: 'Register' });
        this.GenderMale =  page.locator('#gender-male');
        this.GenderFemale =  page.locator('#gender-female');
        this.FirstName =  page.getByRole('textbox', { name: 'First name' });
        this.LastName =  page.getByRole('textbox', { name: 'Last name' });
        this.Email =  page.getByRole('textbox', { name: 'Email' });
        this.Password = page.locator('#Password');
        this.ConfirmPassword = page.locator('#ConfirmPassword');
        this.RegisterButton =  page.getByRole('button', { name: 'Register' });
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