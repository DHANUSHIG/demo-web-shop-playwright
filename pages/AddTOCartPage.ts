import {Locator,Page,expect} from "@playwright/test";

export class AddTOCartPage{ 
    readonly page:Page;

    readonly AddToCartButton:Locator;
    readonly ShoppingCartLink:Locator
    readonly ShoppingCartItemCount:Locator;

    constructor(page:Page){
        this.page=page;
        this.AddToCartButton=page.locator(".add-to-cart-button");
        this.ShoppingCartLink=page.getByRole('link', { name: 'Shopping cart' });
        this.ShoppingCartItemCount=page.locator('.cart-qty');
    }

     async addToCart() {

        await this.AddToCartButton.click();

    }
    

    async getCartCount() {

        return await this.ShoppingCartItemCount.textContent();

    }
    
}
 