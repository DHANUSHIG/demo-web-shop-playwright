import { test, expect } from "../fixtures/baseTest";

test("Valid Billing Address", async ({page,
    login,
    searchPage,
    productDetailsPage,
    addToCartPage,
    shoppingcartPage,
    checkoutpage,
    billingPage
}) => {

    // Clear Cart
   // await shoppingcartPage.clearCart();

    // Search Product
    await searchPage.searchProduct("Smartphone")

    // Open Product
    await productDetailsPage.openProduct("Smartphone");

    // Add To Cart
    await addToCartPage.addToCart();

    // Open Cart
    await shoppingcartPage.Clickcart();

    // Checkout
    await checkoutpage.Checkterms();
    await checkoutpage.clickCheckout();

    await billingPage.ClickNewAddress('New Address');

    // Fill Billing Address
    await billingPage.fillBillingAddress();

    // Continue
    await billingPage.clickContinue();

    await  billingPage.clickContinue1();
    await page.pause();


});