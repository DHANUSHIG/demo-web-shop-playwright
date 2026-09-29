import { Locator, Page } from "@playwright/test";
import { RandomData } from "../utils/RandomData";

export class BillingPage {

    readonly page: Page;

    readonly NewAddress: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly company: Locator;
    readonly country: Locator;
    readonly city: Locator;
    readonly address1: Locator;
    readonly address2: Locator;
    readonly zipCode: Locator;
    readonly phoneNumber: Locator;
    readonly continueButton: Locator;
    readonly continueButton2:Locator;

    constructor(page: Page) {

        this.page = page;
        this.NewAddress = page.getByRole('combobox', { name: 'Select a billing address from your address book or enter a new address.' });
        this.firstName = page.getByRole('textbox', { name: 'First name:' });
        this.lastName = page.getByRole('textbox', { name: 'Last name:' });
        this.email = page.getByRole('textbox', { name: 'Email:' });
        this.company = page.getByRole('textbox', { name: 'Company:' });

        this.country = page.getByRole('combobox', { name: 'Country:' });

        this.city = page.getByRole('textbox', { name: 'City:' });

        this.address1 = page.getByRole('textbox', { name: 'Address 1:' });

        this.address2 = page.getByRole('textbox', { name: 'Address 2:' });

        this.zipCode = page.getByRole('textbox', { name: 'Zip / postal code:' });

        this.phoneNumber = page.getByRole('textbox', { name: 'Phone number:' });

        this.continueButton = page.locator("#billing-buttons-container input.button-1");

        this .continueButton2=page.locator("//input[@onclick='Shipping.save()']");

    }

    async ClickNewAddress(address: string) {
        await this.NewAddress.selectOption(address);
    }

    async fillBillingAddress() {

        await this.firstName.clear();

        await this.firstName.fill(RandomData.generateRandomString(6));
        await this.lastName.fill(RandomData.generateRandomString(6));
        await this.email.fill(RandomData.generateRandomEmail(7));
        await this.company.fill("OpenAI Pvt Ltd");

        await this.country.selectOption({ label: "India" });

        await this.city.fill("Bengaluru");
        await this.address1.fill("Electronic City");
        await this.address2.fill("Phase 1");
        await this.zipCode.fill("560100");
        await this.phoneNumber.fill("9876543210");

    }

    async clickContinue() {

        await this.continueButton.click();

    }
     async clickContinue1() {

        await this.continueButton2.click();

    }

}