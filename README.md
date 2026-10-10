# Automation Exercise - End-to-End Test Automation Framework

[![Playwright Tests](https://img.shields.io/badge/playwright-v1.50.1-45ba4b?logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-v5.7.3-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Test Suite Status](https://img.shields.io/badge/tests-TC01--TC05%20Passing-brightgreen)]()

A production-ready End-to-End (E2E) and API test automation framework targeting [Automation Exercise](https://automationexercise.com/). Built with **Playwright** and **TypeScript**, following **Page Object Model (POM)**, **Test-Driven Development (TDD)**, and **Clean Code** principles.

---

## 📑 Table of Contents

- [Project Overview & Tech Stack](#-project-overview--tech-stack)
- [Key Architecture Highlights](#-key-architecture-highlights)
- [Directory Structure](#-directory-structure)
- [Test Suite Status](#-test-suite-status)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Test Execution Guide](#-test-execution-guide)
  - [Quick Commands](#quick-commands)
  - [Tag-Based Execution](#tag-based-execution)
  - [Cross-Browser Execution](#cross-browser-execution)
  - [Debugging & UI Mode](#debugging--ui-mode)
  - [Generating & Viewing Reports](#generating--viewing-reports)
- [Coding & Engineering Standards](#-coding--engineering-standards)

---

## 🚀 Project Overview & Tech Stack

This framework delivers robust, resilient, and maintainable regression and smoke test coverage for the Automation Exercise e-commerce platform.

### Core Tech Stack

| Technology | Role | Version / Detail |
| :--- | :--- | :--- |
| **[Playwright](https://playwright.dev/)** | Core Test Runner & Browser Automation | `^1.50.1` |
| **[TypeScript](https://www.typescriptlang.org/)** | Strongly-typed OOP language | `^5.7.3` (ES2022 Target) |
| **[@faker-js/faker](https://fakerjs.dev/)** | Dynamic, unique synthetic test data generation | `^9.5.0` |
| **[dotenv](https://github.com/motdotla/dotenv)** | Environment variable management | `^16.4.7` |
| **Node.js** | JavaScript runtime environment | `>= 18.x` |

---

## 🏛 Key Architecture Highlights

### 1. Custom Test Fixture (`base-fixture.ts`)
- Extends Playwright's core `test` runner with dependency-injected Page Object fixtures (`homePage`, `signupLoginPage`, `accountInformationPage`, `accountCreatedPage`, `accountDeletedPage`).
- Eliminates manual `new PageObject(page)` boilerplate inside individual test files.
- Automatically injects **network route blocking** for third-party advertisements and tracking scripts across every test run, minimizing flaky UI disruptions.

### 2. Wildcard Path Aliases
Configured in `tsconfig.json` to prevent brittle relative directory paths (`../../`):
- `@pages/*` &rarr; `pages/*`
- `@fixtures/*` &rarr; `fixtures/*`
- `@constants/*` &rarr; `constants/*`
- `@data/*` & `@test-data/*` &rarr; `test-data/*`
- `@utils/*` &rarr; `utils/*`

### 3. Centralized Application Context (`app-context.ts`)
- Serves as the single source of truth for UI validation strings, expected headings, validation error messages, and success notices.
- Prevents hardcoded magic strings inside page objects and spec files.

### 4. No Barrel (`index.ts`) Files
- Direct, explicit file imports are strictly enforced across the codebase.
- Avoids circular dependency traps, improves build performance, and prevents test runner overhead.

### 5. Self-Explanatory Clean Code & TDD
- Strict separation of test phases: **Precondition**, **Actions**, **Assertions**, and **Cleanup**.
- Resilient locator strategy prioritizing user-facing accessibility locators (`getByRole`, `getByText`, `getByPlaceholder`, `getByLabel`).
- Zero arbitrary timeouts (`waitForTimeout`); all interactions rely on Playwright's auto-waiting and explicit web-first assertions (`expect(locator).toBeVisible()`).

### 6. Hybrid API & UI Test Acceleration
- Integrated `ApiClient` (`@utils/apiClient`) leveraging Playwright's `APIRequestContext`.
- Allows test preconditions (such as user creation for login and conflict verification) to execute via direct HTTP requests, slashing test suite execution time.

### 7. Dual Tagging System
- Flexible test categorization using Playwright's native tagging syntax `{ tag: ['@smoke', '@regression'] }`.
- Allows selective execution in CI/CD pipelines for fast-feedback smoke gates and exhaustive nightly regression runs.

---

## 📂 Directory Structure

```text
automation_exercise_agent/
├── .env.example             # Template for local environment variables
├── .gitignore               # Git exclusion rules
├── AGENT.md                 # Agent context & system instructions
├── README.md                # Project documentation & guidelines
├── package.json             # NPM dependencies and run scripts
├── playwright.config.ts     # Playwright test configuration
├── tsconfig.json            # TypeScript configuration with path aliases
├── constants/               # Global constants & UI strings
│   ├── app-context.ts       # Centralized headings, error & success messages
│   └── messages.ts          # Alert & notification text constants
├── docs/                    # Test suite documentation & plans
│   └── TEST_CASES.md        # Comprehensive 26-test case specifications
├── fixtures/                # Custom Playwright test fixtures
│   └── base-fixture.ts      # Extended test runner with injected page objects
├── pages/                   # Page Object Model (POM) classes
│   ├── base-page.ts         # Shared base page class
│   ├── home-page.ts         # Homepage locators & actions
│   ├── signup-login-page.ts # Auth, login & signup forms
│   ├── account-information-page.ts # Registration profile form
│   ├── account-created-page.ts     # Account creation confirmation
│   └── account-deleted-page.ts     # Account deletion confirmation
├── test-data/               # Dynamic test data generators
│   └── userGenerator.ts     # Faker-based user factory functions
├── tests/                   # End-to-end test specs
│   ├── auth/                # Authentication & account lifecycle specs
│   │   ├── tc01_register_user.spec.ts           # TC01 [@smoke, @regression]
│   │   ├── tc02_login_user.spec.ts              # TC02 [@smoke, @regression]
│   │   ├── tc03_login_invalid.spec.ts           # TC03 [@regression]
│   │   ├── tc04_logout_user.spec.ts             # TC04 [@smoke, @regression]
│   │   └── tc05_register_existing_email.spec.ts # TC05 [@regression]
│   └── smoke.spec.ts        # Environment & sanity health check
└── utils/                   # Test utilities & helpers
    ├── ad-blocker.ts        # Route-level ad & tracker interceptor
    └── apiClient.ts         # Direct API client for fast preconditions
```

---

## 📊 Test Suite Status

Current status of completed test cases in the test suite:

| TC # | Title | Spec File | Tags | Setup Strategy | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC01** | Register User | [`tc01_register_user.spec.ts`](tests/auth/tc01_register_user.spec.ts) | `@smoke`, `@regression` | Faker synthetic user | ✅ Passing |
| **TC02** | Login User with correct email and password | [`tc02_login_user.spec.ts`](tests/auth/tc02_login_user.spec.ts) | `@smoke`, `@regression` | API pre-created user | ✅ Passing |
| **TC03** | Login User with incorrect email and password | [`tc03_login_invalid.spec.ts`](tests/auth/tc03_login_invalid.spec.ts) | `@regression` | Faker unregistered user | ✅ Passing |
| **TC04** | Logout User | [`tc04_logout_user.spec.ts`](tests/auth/tc04_logout_user.spec.ts) | `@smoke`, `@regression` | API pre-created user | ✅ Passing |
| **TC05** | Register User with existing email | [`tc05_register_existing_email.spec.ts`](tests/auth/tc05_register_existing_email.spec.ts) | `@regression` | API pre-created user conflict | ✅ Passing |

---

## 🛠 Getting Started

### Prerequisites

- **Node.js**: `v18.x` or higher (Verify with `node -v`)
- **npm**: `v9.x` or higher (Verify with `npm -v`)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd automation_exercise_agent
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browser binaries and OS dependencies:
   ```bash
   npx playwright install --with-deps
   ```

### Environment Setup

Copy `.env.example` to `.env` and configure environment variables as needed:
```bash
cp .env.example .env
```

Default configuration variables:
```env
BASE_URL=https://automationexercise.com
HEADLESS=true
```

---

## 🚦 Test Execution Guide

### Quick Commands

```bash
# Run all tests in headless mode
npm test

# Run tests with browser window visible (Headed mode)
npm run test:headed
```

### Tag-Based Execution

Execute specific test suites based on tag categorization:

```bash
# Run critical Smoke test suite
npm run test:smoke
# Equivalent to:
npx playwright test --grep "@smoke"

# Run full Regression test suite
npm run test:regression
# Equivalent to:
npx playwright test --grep "@regression"

# Invert selection (e.g., run regression tests excluding smoke)
npx playwright test --grep "@regression" --grep-invert "@smoke"
```

### Cross-Browser Execution

```bash
# Run exclusively on Chromium (Default)
npm run test:chromium

# Run on Firefox
npm run test:firefox

# Run on WebKit (Safari engine)
npm run test:webkit
```

### Debugging & UI Mode

Playwright provides interactive tools for troubleshooting and test inspection:

```bash
# Launch interactive Playwright UI Mode
npm run test:ui

# Run tests in Playwright Inspector (Step-by-step debug)
npm run test:debug
```

### Generating & Viewing Reports

Upon test run completion, Playwright generates a detailed HTML report including traces, videos, and screenshots for failed steps:

```bash
# Open the latest HTML report in your default browser
npm run report
# Equivalent to:
npx playwright show-report
```

---

## 📐 Coding & Engineering Standards

- **Page Object Design**: All page interactions and locators must be encapsulated within dedicated classes extending `BasePage`. Spec files must contain zero raw CSS/XPath selectors.
- **Assertions**: Assertions must reside in test specs, or be exposed as semantic assertion methods on Page Objects (`verifyPageLoaded()`, `verifyLoginHeaderVisible()`).
- **No Flaky Sleep**: Never use `page.waitForTimeout()`. Rely on Playwright's auto-waiting and locator assertions.
- **Cleanup**: Tests that create persistent entities should perform cleanup steps where applicable (e.g. deleting the registered account).
