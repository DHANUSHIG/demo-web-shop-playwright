import { Locator, Page } from "@playwright/test"

export class ShoppingCartPage {
    readonly page: Page;

    readonly ClickShopingCart: Locator;
    readonly SelectacrtChekbox: Locator;
    readonly updateCratValue: Locator;
    readonly updateCartButton: Locator;
    readonly EmptyCartMesssage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ClickShopingCart = page.locator('span:has-text("Shopping cart")');
        this.SelectacrtChekbox = page.locator(`//tr[td[contains(., 'Remove:')]]//input[@type='checkbox']`);
        this.updateCratValue = page.locator(`//tr[td[contains(., 'Remove:')]]//input[@type='text']`);
        this.updateCartButton = page.locator('[name="updatecart"]');
        this.EmptyCartMesssage = page.getByText('Your Shopping Cart is empty!', { exact: true });
    }

    async Clickcart() {
        await this.ClickShopingCart.click();
    }
    async SelectCheckBox() {
        await this.SelectacrtChekbox.check();
    }
    async UpdateCart(Number: string) {
        await this.updateCratValue.fill(Number);
    }
    async EmptyCart() {
        await this.updateCartButton.click();
    }

    async isCartEmpty() {
        return await this.EmptyCartMesssage.isVisible();

    }
    async clearCart() {
        await this.Clickcart();
        if (await this.isCartEmpty()) {
            return;
        }
        await this.SelectCheckBox();
        await this.EmptyCart();
         
    }
}


