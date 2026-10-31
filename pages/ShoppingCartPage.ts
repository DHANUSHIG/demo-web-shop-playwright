import { Locator, Page } from "@playwright/test";

export class ShoppingCartPage {
    readonly page: Page;

    readonly ClickShopingCart: Locator;
    readonly SelectacrtChekbox: Locator;
    readonly removeCheckboxes: Locator;
    readonly updateCratValue: Locator;
    readonly updateCartButton: Locator;
    readonly EmptyCartMesssage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.ClickShopingCart = page.locator('span:has-text("Shopping cart")');
        this.removeCheckboxes = page.locator('input[name="removefromcart"]');
        this.SelectacrtChekbox = page.locator('input[name="removefromcart"]').first();
        this.updateCratValue = page.locator('input.qty-input').first();
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

    async isCartEmpty(): Promise<boolean> {
        return await this.EmptyCartMesssage.isVisible();
    }

    async clearCart() {
        await this.Clickcart();
        if (await this.isCartEmpty()) {
            return;
        }
        const count = await this.removeCheckboxes.count();
        for (let i = 0; i < count; i++) {
            await this.removeCheckboxes.nth(i).check();
        }
        await this.updateCartButton.click();
    }
}
