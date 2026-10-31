import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Logindata } from '../testdata/logindata';
import { config } from '../config/ConfigReader';

test.describe("Data Driven Login Tests", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(config.baseUrl);
    });

    for (const data of Logindata) {
        test(`Login with ${data.scenario}`, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.Loginpage.click();
            await loginPage.login(data.Email, data.Password);

            if (data.expectedResult === "Pass") {
                await expect(loginPage.logoutButton).toBeVisible();
            } else if (data.expectedResult === "Fail") {
                await expect(loginPage.ErrorMessage).toBeVisible();
            }
        });
    }
});
