import { expect, test } from "../fixtures/baseTest";

test("Valid checkout", async ({ shoppingcartPage, login, searchPage, productDetailsPage, checkoutpage, addToCartPage }) => {
    await shoppingcartPage.Clickcart();
    if (await shoppingcartPage.isCartEmpty()) {
        await expect(shoppingcartPage.EmptyCartMesssage).toBeVisible();
    }
    else {
        await shoppingcartPage.SelectCheckBox();
        await shoppingcartPage.UpdateCart("0");
        await shoppingcartPage.EmptyCart();
        await expect(shoppingcartPage.EmptyCartMesssage).toBeVisible();
    }

    await searchPage.searchProduct("phone");
    await productDetailsPage.openProduct("Smartphone");
    await addToCartPage.addToCart();
    await shoppingcartPage.Clickcart();
    await checkoutpage.selectCountry("India");
    await checkoutpage.Checkterms();
    await checkoutpage.clickCheckout();
    await expect(checkoutpage.BillingPage).toBeVisible();
});