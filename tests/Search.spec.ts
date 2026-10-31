import { test, expect } from "../fixtures/baseTest";

test("ValidsearchProduct", async ({ login, searchPage }) => {
    await searchPage.searchProduct("phone");
    await expect(searchPage.ValidSearchResult).toBeVisible();
});

test("InvalidsearchProduct", async ({ login, searchPage }) => {
    await searchPage.searchProduct("invalidproduct");
    await expect(searchPage.InvalidSearchResult).toBeVisible();
});
