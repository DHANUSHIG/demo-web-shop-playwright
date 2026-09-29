import {Locator, Page} from '@playwright/test'

export class CheckoutPage{
 readonly page:Page;

 readonly CountryDropDown:Locator;
 readonly AgreeTeramCheckbox:Locator;
 readonly CheckoutButton:Locator;
 readonly BillingPage:Locator;

 constructor(page:Page){
    this.page=page;
    this.CountryDropDown=page.getByRole('combobox', { name: 'Country:' });
    this.AgreeTeramCheckbox=page.locator('#termsofservice');
    this.CheckoutButton=page.getByRole('button', { name: 'Checkout' });
    this.BillingPage=page.getByRole('heading', { name: 'Checkout' })
 }
 async selectCountry(counrty:string){
    await this.CountryDropDown.selectOption(counrty);
 }

 async Checkterms(){
    await this.AgreeTeramCheckbox.check();
 }
 async clickCheckout(){
    await this.CheckoutButton.click();
 }
 async billingpage(){
     return await this.BillingPage.isVisible();
 }
}