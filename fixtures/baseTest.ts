import { test as base } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../config/ConfigReader';
import { AddTOCartPage } from '../pages/AddTOCartPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';
import { SearchPage } from '../pages/SearchPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { BillingPage } from '../pages/BillingPage';
import { logger as rootLogger, Logger } from '../utils/Logger';

export { expect } from '@playwright/test';

export const test = base.extend<{
    logger: Logger;
    login: void;
    searchPage: SearchPage;
    productDetailsPage: ProductDetailsPage;
    addToCartPage: AddTOCartPage;
    shoppingcartPage: ShoppingCartPage;
    checkoutpage: CheckoutPage;
    billingPage: BillingPage;
}>({
    logger: [
        async ({}, use, testInfo) => {
            const testLogger = rootLogger.child({
                test: testInfo.title,
                file: path.basename(testInfo.file),
                worker: testInfo.workerIndex,
            });

            testLogger.info({ event: 'TEST_START' }, `Test started: ${testInfo.title}`);

            await use(testLogger);

            const durationMs = testInfo.duration;
            const status = testInfo.status;

            if (status === 'passed') {
                testLogger.info({ event: 'TEST_PASSED', durationMs }, `Test passed in ${durationMs}ms: ${testInfo.title}`);
            } else if (status === 'failed' || status === 'timedOut') {
                const errorMsg = testInfo.errors[0]?.message || 'Unknown error';
                testLogger.error(
                    { event: 'TEST_FAILED', status, durationMs, error: errorMsg },
                    `Test failed (${status}) in ${durationMs}ms: ${testInfo.title} - ${errorMsg}`
                );
            }
        },
        { auto: true },
    ],

    login: async ({ page, logger }, use) => {
        logger.debug({ event: 'NAVIGATE' }, `Navigating to base URL: ${config.baseUrl}`);
        await page.goto(config.baseUrl);

        const loginPage = new LoginPage(page);
        logger.debug({ event: 'AUTH' }, 'Initiating user login sequence');
        await loginPage.Loginpage.click();

        await loginPage.login(config.validEmail, config.validPassword);
        logger.info({ event: 'AUTH_SUCCESS' }, 'User authentication completed');

        await use();
    },

    searchPage: async ({ page }, use) => {
        await use(new SearchPage(page));
    },

    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    },

    addToCartPage: async ({ page }, use) => {
        await use(new AddTOCartPage(page));
    },

    shoppingcartPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page));
    },

    checkoutpage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    billingPage: async ({ page }, use) => {
        await use(new BillingPage(page));
    },
});
