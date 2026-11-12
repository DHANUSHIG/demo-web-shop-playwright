# Demo Web Shop — Playwright & TypeScript Automation Framework

[![Playwright Tests](https://github.com/dhanush-ig/Demo_WebShop_Playwright_frameWork/actions/workflows/playwright.yml/badge.svg)](https://github.com/dhanush-ig/Demo_WebShop_Playwright_frameWork/actions)
![Playwright Version](https://img.shields.io/badge/playwright-v1.61.1-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-strict-blue.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)

An enterprise-grade, end-to-end test automation framework built with **Playwright** and **TypeScript** for the [Tricentis Demo Web Shop](https://demowebshop.tricentis.com/). 

Designed following modern test engineering best practices, this framework features a robust **Page Object Model (POM)**, **custom dependency-injection fixtures**, **parameterized data-driven testing (DDT)**, **Pino structured runtime logging**, **automatic failure screenshots and traces**, and an optimized **GitHub Actions CI/CD** pipeline.

---

## Table of Contents

- [Project Objectives](#project-objectives)
- [Technology Stack](#technology-stack)
- [Framework Architecture & Folder Structure](#framework-architecture--folder-structure)
- [Features and Test Scenarios](#features-and-test-scenarios)
- [Page Object Model Implementation](#page-object-model-implementation)
- [Test Data Management](#test-data-management)
- [Configuration and Custom Fixtures](#configuration-and-custom-fixtures)
- [Runtime Logging (Pino)](#runtime-logging-pino)
- [Installation and Prerequisites](#installation-and-prerequisites)
- [Test Execution Guide](#test-execution-guide)
- [CI/CD Integration (GitHub Actions)](#cicd-integration-github-actions)
- [Reporting, Screenshots & Traces](#reporting-screenshots--traces)
- [Project Highlights for Recruiters](#project-highlights-for-recruiters)
- [Future Improvements Roadmap](#future-improvements-roadmap)

---

## Project Objectives

1. **Production-Ready Quality Engineering:** Implement a modular, maintainable automation framework following strict clean-code principles, decoupled business logic, and web-first auto-retrying assertions.
2. **Elimination of Flakiness:** Eradicate arbitrary sleeps (`page.waitForTimeout()`) and fragile selectors in favor of accessible locators (`getByRole`, `getByText`, deterministic attribute selectors) and asynchronous state synchronization.
3. **Comprehensive E-Commerce Coverage:** Validate critical customer journeys including user authentication, registration validations, catalog search, browser dialog handling, cart manipulation, pricing recalculations, and checkout compliance.
4. **Actionable Observability:** Combine Playwright HTML reporting, failure screenshots, trace recordings, and high-performance **Pino** structured logging for rapid triage in both local and CI environments.

---

## Technology Stack

| Layer | Tool / Technology | Purpose |
| :--- | :--- | :--- |
| **Core Framework** | [Playwright Test](https://playwright.dev/) (`^1.61.1`) | Cross-browser end-to-end automation engine |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (`strict: true`) | Compile-time safety, autocompletion, and strongly typed POMs |
| **Runtime Environment** | Node.js (LTS `>=18`) | Execution platform |
| **Design Pattern** | Page Object Model (POM) + Custom Fixtures | UI element encapsulation and dependency injection |
| **Logging Library** | [Pino](https://github.com/pinojs/pino) (`^10.4.0`) + [pino-pretty](https://github.com/pinojs/pino-pretty) | Multi-stream structured NDJSON logging and formatted console logs |
| **Continuous Integration**| GitHub Actions | Automated regression pipeline on push and pull requests |
| **Reporting & Triage** | Playwright HTML Reporter, Screenshots, Traces | Post-execution artifacts and visual debugging |

---

## Framework Architecture & Folder Structure

```
Demo_WebShop_Playwright_frameWork/
├── .github/
│   └── workflows/
│       └── playwright.yml         # GitHub Actions CI workflow (npm caching, Chromium-only setup)
├── config/
│   └── ConfigReader.ts            # Environment endpoints and default test credentials
├── fixtures/
│   └── baseTest.ts                # Custom Playwright test fixture (POM injection, auto-logging, auth)
├── logs/                          # Generated runtime execution logs (*.log ignored in git)
├── pages/                         # Page Object Model class definitions
│   ├── AddTOCartPage.ts           # Product details cart interactions & notification sync
│   ├── BillingPage.ts             # Checkout accordion billing & address inputs
│   ├── CheckoutPage.ts            # Terms of service verification and checkout initiation
│   ├── LoginPage.ts               # Login form fields, buttons, and error locators
│   ├── ProductDetailsPage.ts      # Product details verification (title, price, stock)
│   ├── RegisterPage.ts            # Registration form elements and field validation errors
│   ├── SearchPage.ts              # Global search input, search button, and result locators
│   └── ShoppingCartPage.ts        # Cart table actions, item removal, quantity editing & totals
├── testdata/
│   └── logindata.ts               # Strongly typed dataset for data-driven login scenarios
├── tests/                         # Test specifications (18 automated scenarios across 9 files)
│   ├── Billing.spec.ts            # Billing address submission and step progression
│   ├── Checkout.spec.ts           # Checkout navigation and Terms of Service rejection check
│   ├── EmptyShopingCart.spec.ts   # Cart cleanup and empty state validation
│   ├── Login.spec.ts              # Positive smoke authentication test
│   ├── LoginDDT.spec.ts           # Parameterized data-driven login test suite (3 scenarios)
│   ├── Register.spec.ts           # Registration positive & negative validation suite (4 scenarios)
│   ├── Search.spec.ts             # Valid search, invalid search, and empty dialog alert (3 scenarios)
│   ├── VerifyAddTocart.spec.ts    # Cart count increment and quantity price recalculation (2 scenarios)
│   └── VerifyProductDetails.spec.ts # Product details verification
├── utils/
│   ├── Logger.ts                  # Reusable Pino multi-stream logger with sensitive data redaction
│   └── RandomData.ts              # Dynamic string and randomized email generation utility
├── .gitignore                     # Git exclusion rules (node_modules, reports, logs, .env)
├── package.json                   # Dependencies and npm scripts
├── playwright.config.ts           # Global Playwright configuration
└── tsconfig.json                  # TypeScript compiler settings
```

---

## Features and Test Scenarios

The suite currently contains **18 automated test cases across 9 test files**:

### 1. Authentication & Session Management
- **Positive Smoke Login (`tests/Login.spec.ts`):** Verifies successful login using valid credentials and confirms the presence of the "Log out" button.
- **Data-Driven Login Suite (`tests/LoginDDT.spec.ts`):** Dynamically generated independent tests validating:
  - *Valid credentials:* Validates successful login and user session.
  - *Invalid credentials:* Validates rejection with `"Login was unsuccessful. Please correct the errors and try again."`.
  - *Empty credentials:* Validates failure handling and error banner display in fresh isolated page contexts.

### 2. User Registration
- **Successful Registration (`tests/Register.spec.ts`):** Uses `RandomData` to generate unique customer names and emails, completing the registration flow and asserting `"Your registration completed"`.
- **Duplicate Email Rejection (`tests/Register.spec.ts`):** Re-attempts registration with an existing email and asserts the summary validation message `"The specified email already exists"`.
- **Password Mismatch Validation (`tests/Register.spec.ts`):** Supplies mismatched passwords and asserts the inline error `"The password and confirmation password do not match."`.
- **Required Fields Validation (`tests/Register.spec.ts`):** Submits an empty registration form and asserts field-level error messages for First Name, Last Name, Email, and Password.

### 3. Catalog Search & Event Handling
- **Existing Product Search (`tests/Search.spec.ts`):** Searches for `"phone"` and asserts product visibility in the search gallery.
- **Non-Existent Product Search (`tests/Search.spec.ts`):** Searches for `"invalidproduct"` and asserts `"No products were found that matched your criteria."`.
- **Empty Search Input (`tests/Search.spec.ts`):** Validates client-side event handling by attaching a Playwright dialog listener to capture and verify the JavaScript alert: `"Please enter some search keyword"`.

### 4. Shopping Cart & Calculations
- **Cart Badge Quantity (`tests/VerifyAddTocart.spec.ts`):** Verifies that adding an item increments the header cart badge count.
- **Subtotal & Total Recalculation (`tests/VerifyAddTocart.spec.ts`):** Updates an item quantity from `1` to `2` in `/cart`, clicks "Update shopping cart", and asserts that both line `.product-subtotal` and `.order-total` accurately recalculate to `$200.00`.
- **Empty Shopping Cart (`tests/EmptyShopingCart.spec.ts`):** Programmatically selects all items in the cart table, updates them, and asserts `"Your Shopping Cart is empty!"`.

### 5. Checkout & Billing Progression
- **Navigation to Checkout (`tests/Checkout.spec.ts`):** Adds a product, opens the cart, accepts the Terms of Service, and verifies navigation to the checkout page.
- **Terms of Service Compliance Gate (`tests/Checkout.spec.ts`):** Attempts to initiate checkout without checking the Terms of Service box, asserting that the warning modal appears with `"Please accept the terms of service before the next step."`.
- **Billing Address Progression (`tests/Billing.spec.ts`):** Completes checkout Step 1 (Billing Address) and Step 2 (Shipping Address) and verifies seamless accordion progression to Step 3 (`#opc-shipping_method`).

---

## Page Object Model Implementation

Every page has a corresponding class in `pages/` that strictly encapsulates:
1. **Private/Readonly Locators:** Using accessible queries (`page.getByRole`, `page.getByText`) and reliable ID/attribute selectors.
2. **Action Methods:** Atomic user actions (e.g. `login()`, `searchProduct()`, `clearCart()`).
3. **Decoupled Assertions:** Assertions remain in test specifications (`tests/*.spec.ts`) to maintain clear separation between page structure and test intent.

---

## Test Data Management

- **Strongly Typed Data (`testdata/logindata.ts`):** Configured with TypeScript interfaces (`LoginDataRecord`) to guarantee type safety:
  ```typescript
  export interface LoginDataRecord {
      scenario: string;
      Email: string;
      Password: string;
      expectedResult: "Pass" | "Fail";
  }
  ```
- **Dynamic Data Generation (`utils/RandomData.ts`):** Generates random character strings and unique emails on demand (`generateRandomEmail()`), preventing test collisions during registration runs.
- **Configuration Reader (`config/ConfigReader.ts`):** Centralizes application URLs and default credentials.

---

## Configuration and Custom Fixtures

### Custom Test Fixture (`fixtures/baseTest.ts`)
The framework leverages Playwright's **Dependency Injection** system instead of repetitive `beforeEach` hooks:
- **POM Injection:** Automatically instantiates and injects `searchPage`, `productDetailsPage`, `addToCartPage`, `shoppingcartPage`, `checkoutpage`, and `billingPage` directly into tests that request them.
- **Reusable Authentication (`login`):** An on-demand fixture that logs in with valid credentials only for tests that require an authenticated session.
- **Auto-Logging Fixture (`logger`):** Runs automatically for every test, attaching test titles, file basenames, and worker indices to logs.

### Global Configuration (`playwright.config.ts`)
- **Parallel Execution:** `fullyParallel: true` enabled.
- **Worker Management:** Configured to run `workers: 1` in CI environments to prevent server-side account cart collisions, while leveraging multi-core parallel execution locally.
- **Automatic Failure Artifacts:** `screenshot: 'only-on-failure'` and `trace: 'on-first-retry'`.
- **Silent Report Generation:** Configured with `[['html', { open: 'never' }]]` for headless and CI compatibility.

---

## Runtime Logging (Pino)

Integrated with **Pino** to provide structured, multi-stream logging without cluttering Playwright's built-in reports:

1. **Console Stream:** Formatted with `pino-pretty` for human readability during local debugging.
2. **File Stream (`logs/test-execution.log`):** Machine-readable NDJSON logs capturing event types (`TEST_START`, `NAVIGATE`, `AUTH`, `TEST_PASSED`, `TEST_FAILED`), durations, and worker details.
3. **Sensitive Data Redaction:** Automatically masks fields matching `password`, `confirmPassword`, and `token` as `***REDACTED***`.
4. **Environment-Driven Levels:** Configurable via `LOG_LEVEL` (`debug` locally, `info` on CI).

---

## Installation and Prerequisites

### Prerequisites
- **Node.js:** `>=18.x` installed ([Download Node.js](https://nodejs.org/))
- **npm:** Package manager bundled with Node.js
- **Git:** Version control

### Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhanush-ig/Demo_WebShop_Playwright_frameWork.git
   cd Demo_WebShop_Playwright_frameWork
   ```
2. **Install project dependencies:**
   ```bash
   npm ci
   ```
3. **Install Playwright Chromium browser binary:**
   ```bash
   npx playwright install --with-deps chromium
   ```

---

## Test Execution Guide

Standard npm scripts are configured in `package.json`:

### Run Full Test Suite (Headless)
```bash
npm test
```
*(Runs all 18 tests headlessly across parallel workers).*

### Run Tests in Headed Mode (Browser Visible)
```bash
npm run test:headed
```

### Run Tests in Interactive UI Mode
```bash
npm run test:ui
```

### Run Specific Test Files
```bash
npx playwright test tests/Login.spec.ts
npx playwright test tests/Search.spec.ts
npx playwright test tests/Register.spec.ts
```

### Run Tests by Title or Tag
```bash
npx playwright test -g "Terms of service"
npx playwright test -g "Data Driven Login"
```

### Control Concurrency (Workers)
```bash
npx playwright test --workers=2
npx playwright test --workers=1
```

---

## CI/CD Integration (GitHub Actions)

The workflow file is located at [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml).

### CI Architecture:
- **Triggers:** Automatically executes on `push` and `pull_request` targeting `main`, `master`, and `ai-testing-improvement`.
- **Runner:** `ubuntu-latest`.
- **Performance Optimizations:**
  - Node module caching via `actions/setup-node@v4` with `cache: 'npm'`.
  - Targeted browser installation via `npx playwright install --with-deps chromium` (bypasses redundant WebKit and Firefox downloads, cutting CI runtime by >50%).
- **Deterministic Concurrency:** Automatically sets `workers: 1` on CI to prevent multi-worker database collisions on shared demo accounts.
- **Artifact Uploads:** Always executes (`if: always()`), uploading:
  1. `playwright-report/` (HTML report with embedded screenshots and traces)
  2. `logs/` (Pino runtime execution log files)

---

## Reporting, Screenshots & Traces

### Viewing the HTML Report
After any test run, open the interactive Playwright report:
```bash
npm run test:report
```

### Screenshot on Failure
When any test fails, Playwright captures a viewport screenshot at the exact moment of failure and saves it to:
```
test-results/<test-scenario-name>-chromium/test-failed-1.png
```
Screenshots are automatically linked inside the HTML report under the **Attachments** section.

### Trace Viewer
Failed tests automatically collect execution traces (`trace: 'on-first-retry'`). To inspect a recorded trace:
```bash
npx playwright show-trace test-results/<test-scenario-name>-chromium/trace.zip
```

---

## Project Highlights for Recruiters

- **Zero Arbitrary Sleeps:** 100% reliant on Playwright's auto-retrying web-first assertions and actionability checks.
- **True Fixture Dependency Injection:** Clean separation of page initialization from test logic; fixtures only run when explicitly requested by a test.
- **Enterprise-Grade Logging:** Structured logging via Pino with sensitive credential redaction, dual-stream output, and test lifecycle instrumentation.
- **Defensive Error Testing:** Comprehensive negative testing covering duplicate accounts, password mismatches, missing required fields, and Terms of Service enforcement.
- **Optimized CI Pipeline:** Implements caching, targeted single-browser installation, and artifact preservation for post-mortem triage.

---

## Future Improvements Roadmap

The following architectural enhancements are planned as future extensions:

- [ ] **Cross-Browser Matrix:** Expand GitHub Actions matrix testing across Firefox and WebKit.
- [ ] **Multi-User State Storage (`storageState`):** Implement isolated pre-authenticated browser states (`auth.json`) per test worker to allow full parallel execution of cart and checkout tests without shared-account collisions.
- [ ] **Visual Regression Testing:** Add pixel-by-pixel visual comparisons using Playwright's `expect(page).toHaveScreenshot()`.
- [ ] **Environment Variable Decoupling:** Move `ConfigReader.ts` hardcoded credentials into a `.env` file managed with `dotenv`.
- [ ] **AI-Assisted Failure Analysis:** Integrate LLM-driven GitHub Actions step to triage failure traces and post root-cause summaries directly to Pull Request comments.

---

## Author

Developed by **Dhanush I G** — Automation Test Engineer  
GitHub: [@dhanush-ig](https://github.com/dhanush-ig)
