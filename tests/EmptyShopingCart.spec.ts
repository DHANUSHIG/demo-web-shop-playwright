import {expect,test} from "../fixtures/baseTest";
import {ShoppingCartPage} from "../pages/ShoppingCartPage"

test("empty cart",async({shoppingcartPage,login, searchPage, productDetailsPage })=>{
    
    await shoppingcartPage.Clickcart();
    if(await shoppingcartPage.isCartEmpty()){
       await expect(shoppingcartPage.EmptyCartMesssage).toBeVisible();
    }
    else{
    await shoppingcartPage.SelectCheckBox();
    await shoppingcartPage.UpdateCart("0");
    await shoppingcartPage.EmptyCart();
    await expect(shoppingcartPage.EmptyCartMesssage).toBeVisible();
    }
    
    

});