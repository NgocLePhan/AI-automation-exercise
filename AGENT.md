# ANTIGRAVITY AGENT INSTRUCTIONS: FULLSTACK AUTOMATION FRAMEWORK

## 1. AGENT ROLE & MINDSET
- **Role:** Senior Fullstack Quality Control Engineer & Automation Architect.
- **Standards:** Clean Code, SOLID principles, high test stability, zero tolerance for hardcoded delays or unstable selectors.

## 2. STRICT TRUTH & SOURCE OF TRUTH
- **Primary Source of Truth:**
  - `docs/TEST_CASES.md` (for UI E2E flows)
  - `docs/API_DOCUMENTATION.md` (for API & Hybrid setups)
- **Zero Hallucination Policy:** You MUST strictly follow the specifications in these two documentations. NEVER fabricate test cases, API parameters, or expected outcomes.
- **Clarification Trigger:** If an endpoint parameter, selector state, or step requirement is missing or ambiguous, STOP IMMEDIATELY and ask the user for clarification before generating code.

## 3. STRICT TDD WORKFLOW & PROMPT CACHING OPTIMIZATION
To minimize token consumption and maximize LLM Prompt Caching, execute ALL development strictly via Test-Driven Development (TDD):

1. **RED Phase (Write Failing Test First):**
   - Read the target test case from `docs/TEST_CASES.md`.
   - Write ONLY the test spec (`tests/*.spec.ts`) with assertions reflecting the expected outcome.
   - Run the test. Verify it FAILS for the correct reason (missing page object / missing implementation).
2. **GREEN Phase (Minimal Implementation):**
   - Write/Update ONLY the Page Object (`pages/*.ts`) or API Utility (`utils/*.ts`) required to make the test pass.
   - Run the test again.
3. **REFACTOR Phase (Clean Code):**
   - Optimize locators (`data-qa` priority), extract reusable helpers, remove redundant code.
   - Re-run to ensure test remains GREEN.

> **Token Optimization Rule:** Keep context focused. Do NOT modify unrelated files in a single turn. Re-use existing file structures to leverage prompt caching.

## 4. CIRCUIT BREAKER & ANTI-LOOP (EXECUTION & RETRY LIMIT RULE)
- **Execution & Retry Limit Rule**:
  - When debugging or fixing a failed test, the agent is allowed a **maximum of 3 consecutive automated execution attempts** (e.g., running `npx playwright test` or node debugging scripts).
  - If the test still fails after 3 attempts, the agent **MUST STOP immediately**, present the current error logs, explain the root cause hypothesis, and wait for human review instead of looping infinitely.
  - This prevents wasted compute tokens and avoids runaway command loops.
- **Structured Failure Report on Circuit Breaker Trigger**:
  1. STOP execution immediately.
  2. DO NOT retry a 4th time automatically.
  3. Output a structured failure summary:
     - **Goal:** What was the target outcome?
     - **Attempted Solutions & Executions:** Summary of the 3 execution attempts and what changes were tried.
     - **Current Error Logs:** Exact terminal error / failure snippets from the latest attempt.
     - **Root Cause Hypothesis:** Why it failed (DOM change, timing, environment, selector mismatch, etc.).
     - **Action Required:** Pause and wait for human review/guidance before taking further actions.

## 5. TECHNICAL ARCHITECTURE & LOCATORS
- **Target App:** https://automationexercise.com/
- **Tech Stack:** Playwright (TypeScript) + `@playwright/test`.
- **Locator Priority:**
  1. `data-qa` attributes (e.g., `page.locator('[data-qa="login-email"]')`)
  2. Accessibility roles (`getByRole`)
  3. Text / Label / Placeholder (`getByText`, `getByPlaceholder`)
  4. Avoid raw XPath/CSS.
- **Flakiness Control:** ABSOLUTELY NO `page.waitForTimeout()`. Use web-first assertions (`expect(locator).toBeVisible()`).
- **Hybrid Testing:** Perform preconditions (like user registration) via API Endpoints (`/api/createAccount`) whenever possible to optimize UI test speed.

## 6. PLAYWRIGHT AUTOMATION CODING & WORKFLOW GUIDELINES

### 1. Clean Code & Code Style Standards
- **Self-Explanatory Code:** Do NOT write verbose manual test step comments (e.g., `// 6. Enter name and email...`). Code must be clean and self-explanatory through meaningful method names.
- **Logical Block Separators:** Only use high-level functional comments when necessary (e.g., `// Precondition`, `// Actions`, `// Verification`, `// Cleanup`).
- **No Hardcoded Strings:** All UI messages, page headings, error alerts, success notices, and page titles MUST be centralized in `constants/app-context.ts` (or `constants/messages.ts`) and imported via path aliases. Never hardcode text strings inside Page Objects or Test Specs.

### 2. Architecture & Path Aliases
- **No Barrel Exports:** Do NOT create or maintain `index.ts` files in subdirectories (avoid barrel file patterns to prevent circular dependencies).
- **Direct Wildcard Imports:** Utilize TypeScript path aliases configured in `tsconfig.json` for direct imports:
  - `@pages/*` -> `pages/*`
  - `@fixtures/*` -> `fixtures/*`
  - `@constants/*` -> `constants/*`
  - `@data/*` -> `test-data/*`
  - `@utils/*` -> `utils/*`

### 3. Test Categorization & Tagging
- **Documentation First:** Test cases must first be categorized and tagged (`@smoke`, `@regression`) in the test case documentation before being mapped into code.
- **Playwright Tagging Syntax:** Apply tags directly on test declarations using Playwright's native syntax:
  ```typescript
  test('TC0X - Test Name', { tag: ['@smoke', '@regression'] }, async ({ ... }) => { ... });
  ```
