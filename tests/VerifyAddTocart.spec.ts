import { expect, test } from "../fixtures/baseTest";
import { config } from "../config/Configreader";
import { AddTOCartPage } from "../pages/AddTOCartPage";

test("Valid Cart Quantity", async ({ page, login, searchPage, productDetailsPage }) => {

  const addToCartPage = new AddTOCartPage(page);

  await searchPage.searchProduct("phone");

  await productDetailsPage.openProduct("Smartphone");

  const beforeCount = await addToCartPage.getCartCount();

  await addToCartPage.addToCart();

  console.log(beforeCount)
  await expect(addToCartPage.ShoppingCartItemCount).not.toHaveText(beforeCount);

  const afterCount = await addToCartPage.getCartCount();
  console.log(afterCount);
});