import { test, expect } from "../fixtures/baseTest";

test("ValidsearchProduct", async ({ login, searchPage }) => {
    await searchPage.searchProduct("phone");
    await expect(searchPage.ValidSearchResult).toBeVisible();
});

test("InvalidsearchProduct", async ({ login, searchPage }) => {
    await searchPage.searchProduct("invalidproduct");
    await expect(searchPage.InvalidSearchResult).toBeVisible();
});

test("Search - Empty search input triggers alert dialog", async ({ login, searchPage, page }) => {
    let dialogAppeared = false;
    page.once("dialog", async (dialog) => {
        expect(dialog.message()).toBe("Please enter some search keyword");
        dialogAppeared = true;
        await dialog.accept();
    });

    await searchPage.SearchPageInput.clear();
    await searchPage.SearchButton.click();
    expect(dialogAppeared).toBe(true);
});
