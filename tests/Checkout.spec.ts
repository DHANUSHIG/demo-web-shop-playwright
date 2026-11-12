import { expect, test } from "../fixtures/baseTest";

test("Valid checkout", async ({ shoppingcartPage, login, searchPage, productDetailsPage, checkoutpage, addToCartPage }) => {
    await shoppingcartPage.clearCart();

    await searchPage.searchProduct("phone");
    await productDetailsPage.openProduct("Smartphone");
    await addToCartPage.addToCart();
    await shoppingcartPage.Clickcart();
    await checkoutpage.selectCountry("India");
    await checkoutpage.Checkterms();
    await checkoutpage.clickCheckout();
    await expect(checkoutpage.BillingPage).toBeVisible();
});

test("Checkout - Terms of service rejection displays warning modal", async ({ shoppingcartPage, login, searchPage, productDetailsPage, checkoutpage, addToCartPage }) => {
    await shoppingcartPage.clearCart();

    await searchPage.searchProduct("phone");
    await productDetailsPage.openProduct("Smartphone");
    await addToCartPage.addToCart();
    await shoppingcartPage.Clickcart();

    // Intentionally do NOT check terms of service
    await checkoutpage.clickCheckout();

    await expect(checkoutpage.termsWarningBox).toBeVisible();
    await expect(checkoutpage.termsWarningBox).toContainText("Please accept the terms of service before the next step.");
});
