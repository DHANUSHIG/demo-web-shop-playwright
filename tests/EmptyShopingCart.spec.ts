import { expect, test } from "../fixtures/baseTest";

test("empty cart", async ({ shoppingcartPage, login }) => {
    await shoppingcartPage.clearCart();
    await expect(shoppingcartPage.EmptyCartMesssage).toBeVisible();
});
