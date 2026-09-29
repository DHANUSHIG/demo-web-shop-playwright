import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../config/Configreader';
import { AddTOCartPage } from '../pages/AddTOCartPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { SearchPage } from '../pages/SearchPage';
import {ShoppingCartPage} from '../pages/ShoppingCartPage';
import {CheckoutPage} from '../pages/CheckoutPage';
import {BillingPage} from '../pages/BillingPage';
export { expect } from '@playwright/test';


export const test = base.extend<{ login: void; 
    searchPage: SearchPage; 
    productDetailsPage: ProductDetailsPage; 
    addToCartPage: AddTOCartPage; 
    shoppingcartPage:ShoppingCartPage,
    checkoutpage:CheckoutPage,
    billingPage:BillingPage
}>({

    login: async ({ page }, use) => {

        await page.goto(config.baseUrl);

        const loginPage = new LoginPage(page);

        await loginPage.Loginpage.click();

        await loginPage.login(
            config.validEmail,
            config.validPassword
        );

        await use();

    },
    searchPage: async ({ page }, use) => {

        await use(new SearchPage(page));

    },

    productDetailsPage: async ({ page }, use) => {


        await use(new ProductDetailsPage(page));

    },

    addToCartPage: async ({ page }, use) => {

        await use(new AddTOCartPage(page));

    },

    shoppingcartPage:async({page},use)=>{
        await use(new ShoppingCartPage(page));
    },

    checkoutpage:async({page},use)=>{
        await use(new CheckoutPage(page));
    },

    billingPage:async({page},use)=>{
        await use(new BillingPage(page));
    }


});