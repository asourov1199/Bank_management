# Greenline Bank — Bank Management System

A responsive frontend banking demo built with React and Vite. View an account, deposit simulated money, withdraw with confirmation, and review transaction history.

**This is a practice project. It does not connect to a real bank or transfer money.**

## Run locally

Install Node.js 22.12 or newer (Node.js 24 LTS is suitable) and npm. Open a terminal in the folder containing `package.json`:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite, normally http://localhost:5173. Stop the server with Ctrl+C. Do not open `index.html` directly or use VS Code Live Server.

## Features

- Dashboard with bank name, account holder, account number, balance, total deposits and total withdrawals.
- Deposit form with immediate updates and success feedback.
- Withdrawal form with balance checks and a confirmation/cancel step.
- Validation for empty, zero, negative, nonnumeric, overly large and over-precision amounts.
- Newest-first transaction history showing type, amount and local date/time.
- Shared navigation using React Router DOM and NavLink.
- Reusable Navbar, BalanceCard, DepositForm, WithdrawForm, TransactionList and TransactionItem components.
- Context API for shared state; useState for account, transactions and forms; useEffect for persistence; useRef for focus.
- localStorage persistence after refresh; safe fallback for malformed stored data and a warning if saving fails.
- Responsive desktop/mobile layout, keyboard focus indicators and live form messages.

## Demo account

| Setting                            | Value                      |
| ---------------------------------- | -------------------------- |
| Bank                               | Greenline Bank (fictional) |
| Account holder                     | Ashraful Islam Sourov      |
| Account number                     | 1020 4589 0021 (fictional) |
| Opening balance                    | BDT 25,000.00              |
| Opening deposited/withdrawn totals | BDT 0.00                   |

The opening balance is not counted as a deposit. Money is stored as integer poisha (100 poisha = BDT 1) to avoid floating-point rounding errors. Balance = opening balance + total deposits - total withdrawals. The demo balance limit is BDT 999,999,999.99.

Change the account name, number or opening balance in `src/utils/banking.js`. After changing the opening balance, clear the saved demo data before testing again.

## Commands

| Command            | Purpose                                            |
| ------------------ | -------------------------------------------------- |
| `npm ci`           | Install exact versions from package-lock.json      |
| `npm run dev`      | Start the Vite development server                  |
| `npm test`         | Run banking logic tests                            |
| `npm run test:e2e` | Run Chromium browser tests (install browser first) |
| `npm run build`    | Create the production build in dist/               |
| `npm run preview`  | Preview the production build locally               |

For browser tests:

```bash
npx playwright install chromium
npm run test:e2e
```

## Project structure

```text
bank-management/
  src/
    components/       Reusable UI and forms
    context/          BankProvider and useBank hook
    pages/            Dashboard, Deposit, Withdraw, Transactions
    utils/            Money validation, ledger and persistence recovery
    App.jsx           Shared layout and routes
    main.jsx          React entry point and providers
    index.css         Responsive styling
  tests/              Banking logic and browser tests
  docs/               GitHub guide and code walkthrough
  index.html
  package.json
  package-lock.json
  vite.config.js
  playwright.config.js
```

## How state flows

`BankProvider` owns a single state object containing the balance and transactions. Each page reads it with `useBank()`. Forms receive the balance and transaction callback through props. They validate an amount, then call the shared transaction function. A successful update changes the balance and history together; all pages then show the same account state. `useEffect` writes the result to localStorage.

`HashRouter` uses routes such as `/#/deposit`. This also allows refreshes on static hosting without server rewrite rules. Vite's relative asset base supports a repository subdirectory if you later deploy the compiled app. Uploading source to a repository alone does not publish a live website.

## Data storage and limitations

Data is stored under `greenline-bank-v1` in this browser for this site origin. It is not synced across devices or browser profiles. Use one tab for this assignment; simultaneous edits in multiple tabs are not synchronized. Clearing browser site data removes the demo history. To reset only this app, run this in the browser developer console and refresh:

```js
localStorage.removeItem("greenline-bank-v1");
location.reload();
```

No backend, authentication, database, API keys or payment integration is needed. Google Fonts improves the typeface when online; local font fallbacks keep the app usable offline once served. localStorage is editable by the browser user and is not secure banking storage.

## Validation checklist

1. Fresh dashboard shows BDT 25,000.00, zero deposits and zero withdrawals.
2. Deposit 100.50: balance becomes 25,100.50 and deposited total becomes 100.50.
3. Withdraw 50.25, then cancel: no money or history changes.
4. Repeat and confirm: balance becomes 25,050.25 and withdrawn total becomes 50.25.
5. Empty, zero, negative, text and three-decimal input display errors.
6. An amount above available balance cannot be withdrawn.
7. History lists both transactions with different colors, newest first.
8. Refresh: balance and history remain. Test at a narrow mobile viewport.

See [the GitHub upload guide](docs/GITHUB_UPLOAD_GUIDE.md) for the complete submission steps and [the code walkthrough](docs/CODE_WALKTHROUGH.md) to understand the implementation.
