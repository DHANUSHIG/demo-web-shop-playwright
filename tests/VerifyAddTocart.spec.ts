import { expect, test } from "../fixtures/baseTest";
import { config } from "../config/ConfigReader";
import { AddTOCartPage } from "../pages/AddTOCartPage";

test("Valid Cart Quantity", async ({ page, login, searchPage, productDetailsPage }) => {
  const addToCartPage = new AddTOCartPage(page);

  await searchPage.searchProduct("phone");
  await productDetailsPage.openProduct("Smartphone");

  const beforeCount = await addToCartPage.getCartCount();
  await addToCartPage.addToCart();

  await expect(addToCartPage.ShoppingCartItemCount).not.toHaveText(beforeCount);
});

test("Cart - Update item quantity recalculates line subtotal and order total", async ({ page, login, searchPage, productDetailsPage, addToCartPage, shoppingcartPage }) => {
  await shoppingcartPage.clearCart();

  await searchPage.searchProduct("phone");
  await productDetailsPage.openProduct("Smartphone");
  await addToCartPage.addToCart();

  await shoppingcartPage.Clickcart();
  await shoppingcartPage.UpdateCart("2");
  await shoppingcartPage.EmptyCart(); // Clicks updatecart button

  await expect(shoppingcartPage.productSubtotal).toHaveText("200.00");
  await expect(shoppingcartPage.orderTotal).toHaveText("200.00");
});
