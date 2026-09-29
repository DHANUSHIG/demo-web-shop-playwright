import { expect, test } from '@playwright/test';
import { config } from '../config/configreader';
import { RegisterPage } from '../pages/RegisterPage';
import { RandomData } from '../utils/RandomData';

test.beforeEach(async ({ page }) => {
    await page.goto(config.baseUrl);
});

test("Register Test", async ({ page }) => {

    const registerPage = new RegisterPage(page);

    const password = RandomData.generateRandomString(8) + "@123";

    await registerPage.Register(
        RandomData.generateRandomString(5),
        RandomData.generateRandomString(5),
        RandomData.generateRandomEmail(10),
        password,
        password
    );

    await expect(page.getByText('You-registration completed')).toBeVisible();

});