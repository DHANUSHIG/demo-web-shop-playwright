import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Logindata } from '../testdata/logindata';
import { config } from '../config/ConfigReader';

test.beforeEach(async ({ page }) => {
    await page.goto(config.baseUrl);
});

test("Verify Login using Data Driven Testing", async ({ page }) => {
    const loginpage = new LoginPage(page);

    for (const data of Logindata) {
        await loginpage.Loginpage.click();
        await loginpage.login(data.Email, data.Password);
        if (data.expectedResult === "Pass") {
            await expect(loginpage.logoutButton).toBeVisible();
            await loginpage.logoutButton.click();
        }
        else if (data.expectedResult === "Fail") {
            await expect(loginpage.ErrorMessage).toBeVisible();
        }
    }
});