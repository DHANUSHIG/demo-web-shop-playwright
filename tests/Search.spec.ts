import {expect,test} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {config} from '../config/ConfigReader';
import {SearchPage} from '../pages/SearchPage';

test.beforeEach(async ({page})=>{
    await page.goto(config.baseUrl)
    const loginpage=new LoginPage(page);
    await loginpage.Loginpage.click();
    await loginpage.login(config.validEmail,config.validPassword);
})

test("ValidsearchProduct",async({page})=>{
    const searchpage=new SearchPage(page);

    await searchpage.searchProduct("phone");
    await expect(searchpage.ValidSearchResult).toBeVisible();
})

test("InvalidsearchProduct",async({page})=>{
    const searchpage=new SearchPage(page);
    await searchpage.searchProduct("invalidproduct");
    await expect(searchpage.InvalidSearchResult).toBeVisible();
})