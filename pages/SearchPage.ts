import {Locator,Page} from "@playwright/test"

export class SearchPage{
    readonly page:Page;

    readonly SearchPageInput:Locator;
     readonly SearchButton:Locator;
    readonly ValidSearchResult:Locator;
    readonly InvalidSearchResult:Locator;

    constructor(page:Page){
        this.page=page;
        this.SearchPageInput=page.locator('#small-searchterms');;
        this.SearchButton=page.locator('input.button-1.search-box-button');
        this.ValidSearchResult= page.getByRole('img', { name: /Picture of Smartphone/i })
        this.InvalidSearchResult=page.getByText('No products were found that matched your criteria.');

    }

    async searchProduct(productName:String){
        await this.SearchPageInput.fill(productName);
        await this.SearchButton.click();
    }}