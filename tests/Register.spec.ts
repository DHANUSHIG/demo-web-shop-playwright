import { expect, test } from '@playwright/test';
import { config } from '../config/ConfigReader';
import { RegisterPage } from '../pages/RegisterPage';
import { RandomData } from '../utils/RandomData';

test.describe("Registration Tests", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(config.baseUrl);
    });

    test("Register Test - Successful registration with unique data", async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const password = RandomData.generateRandomString(8) + "@123";

        await registerPage.Register(
            RandomData.generateRandomString(5),
            RandomData.generateRandomString(5),
            RandomData.generateRandomEmail(10),
            password,
            password
        );

        await expect(page.getByText('Your registration completed')).toBeVisible();
    });

    test("Register - Attempt registration with duplicate email", async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const password = RandomData.generateRandomString(8) + "@123";

        await registerPage.Register(
            RandomData.generateRandomString(5),
            RandomData.generateRandomString(5),
            config.validEmail,
            password,
            password
        );

        await expect(registerPage.emailExistsError).toBeVisible();
        await expect(registerPage.emailExistsError).toContainText('The specified email already exists');
    });

    test("Register - Password and confirmation password mismatch", async ({ page }) => {
        const registerPage = new RegisterPage(page);

        await registerPage.Register(
            RandomData.generateRandomString(5),
            RandomData.generateRandomString(5),
            RandomData.generateRandomEmail(10),
            "ValidPassword@123",
            "MismatchedPassword@456"
        );

        await expect(registerPage.confirmPasswordError).toBeVisible();
        await expect(registerPage.confirmPasswordError).toHaveText('The password and confirmation password do not match.');
    });
});
