import {expect,test} from "../fixtures/baseTest";
import {ProductDetailsPage} from "../pages/ProductDetailsPage";
import {SearchPage} from "../pages/SearchPage";
import {config} from "../config/Configreader";

test("Valid Search", async ({ page, login }) => {
    const productDetailPage = new ProductDetailsPage(page);
    const searchPage = new SearchPage(page);
    await searchPage.searchProduct("phone");
    await productDetailPage.openProduct("Smartphone");
    await productDetailPage.verifyProductDetails("Smartphone", "100.00", "In stock");

});