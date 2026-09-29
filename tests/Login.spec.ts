import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../config/ConfigReader';
test("LoginTest", async ({ page }) => {
    const loginpage = new LoginPage(page);
    await page.goto(config.baseUrl);
    await loginpage.Loginpage.click();
    await loginpage.login(config.validEmail, config.validPassword);
    await expect(loginpage.logoutButton).toBeVisible();
});
