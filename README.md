# ECC Automation Framework

This project is an automated **End-to-End (E2E) UI Testing Framework** built using **Playwright** and **TypeScript**. It is designed for testing web applications handling workspace and facilities management tasks, such as room booking, desk configurations, device management, and user administration.

## Project Structure

The project follows a standard Page Object Model (POM) architecture, which separates test logic from page actions to make the code reusable and maintainable:

```text
playwright-automation
├── tests
│   ├── e2e/                # End-to-end test cases grouped by functional areas
│   ├── fixtures/           # Reusable test data and configurations (e.g., login presets)
│   └── pages/              # Page Object models encapsulating locators and actions
├── src
│   ├── utils/              # Utility functions and helpers for tests
│   └── reporters/          # Custom test result reporters
├── playwright.config.ts    # Playwright configuration file (browsers, timeouts, settings)
├── package.json            # npm configuration and custom test running scripts
├── tsconfig.json           # TypeScript configuration file
├── .github/workflows       # GitHub Actions workflows for CI/CD
└── allure-results/         # Test results directory used by Allure Reports
```

## Setup Instructions

1. **Install Dependencies**: 
   Run the following commands to install the required packages and Playwright browsers:
   ```bash
   npm install
   npx playwright install
   ```

## Running Tests

We have several pre-configured npm scripts available to run the tests in different modes:

- **Run all tests (Headless)**: 
  ```bash
  npm run test
  ```
- **Run all tests (Headed mode on Chrome)**: 
  ```bash
  npm run test:headed
  ```
- **Run Smoke Tests**: Executes critical tests tagged with `@smoke`.
  ```bash
  npm run test:smoke
  ```
- **Run Regression Tests**: Executes comprehensive test suite tagged with `@regression`.
  ```bash
  npm run test:regression
  ```

## Viewing Test Reports

This project utilizes **Allure Reports** to generate detailed, visual test execution reports.

To generate and open an Allure report from the latest test run:
```bash
npm run allure:open
```

## Application Domain Features Covered

- **Authentication & Authorization**: Login, Sign up, Forgot Password, SSO (Single Sign-On).
- **Facilities Management**: Room booking, Room dashboard, Desk booking, Desk configurations.
- **Device Management**: Device lists, Digital Signage management.
- **User & Account Management**: User lists, Profile editing, Account menus, Switching organizations.
- **Support & Settings**: Help articles, Feedback functionality, Billing menus, Connections, System logs, and History logs.

## Usage Guidelines

- Organize your tests inside the `tests/e2e` directory.
- Maintain and expand fixtures in `tests/fixtures` to share complex states easily.
- Implement reusable page interactions in the `tests/pages` directory using the Page Object Model (POM) patterns.
- Customize test reporting by modifying settings within `playwright.config.ts` or custom reporter files under `src/reporters`.

For more detailed information on Playwright, refer to the [official Playwright documentation](https://playwright.dev/docs/intro).