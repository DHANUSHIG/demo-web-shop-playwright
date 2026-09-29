import { Locator, Page } from "@playwright/test"
import { expect } from "@playwright/test"

export class ProductDetailsPage {

    readonly page: Page;

    readonly productPrice: Locator;
    readonly availabilityStatus: Locator;

    constructor(page: Page) {

        this.page = page;

        this.productPrice = page.locator('[itemprop="price"]');

        this.availabilityStatus = page.getByText("In stock");

    }

    async openProduct(productName: string) {

        await this.page.getByRole("link", { name: productName,  exact: true }).click();

    }

    async verifyProductDetails(expectedName: string,expectedPrice: string,expectedAvailability: string) {

        await expect(this.page.getByRole("heading", {name: expectedName,exact: true})).toHaveText(expectedName);

        await expect(this.productPrice).toHaveText(expectedPrice);

        await expect(this.availabilityStatus).toHaveText(expectedAvailability);

    }

}