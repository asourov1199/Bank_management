# Bank Management System

A responsive frontend banking dashboard built with React and Vite for a React fundamentals assignment. It simulates account activity without connecting to a bank or payment service.

## Features

- Dashboard with account holder, masked account number, current balance, total deposits and total withdrawals
- Deposit form with positive amount validation and instant balance updates
- Withdrawal form with insufficient-funds checks and a confirmation prompt
- Transaction history with dates, amounts and color-coded transaction types
- React Router navigation between Dashboard, Deposit, Withdraw and Transactions
- Reusable components, React Context, hooks and browser localStorage persistence
- Responsive layout for desktop and mobile

## Tech stack

React 18, Vite 6, React Router DOM 6, Lucide React and CSS.

## Getting started

Install Node.js 20.19+ or 22.12+ and run:

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/     Reusable navigation, cards, forms and transaction UI
  context/        Account state and transaction operations
  pages/          Dashboard, Deposit, Withdraw and Transactions
  utils/          Currency and date formatting
  App.jsx         Routes and application layout
  main.jsx        Application entry point
  index.css       Responsive styling
```

## How it works

The demo starts with an opening balance of **$12,500** for a fictional account. Deposits increase the balance; withdrawals decrease it. Each successful action creates a dated transaction. State is shared using Context API and saved in `localStorage` after changes, so refreshing the browser keeps the demo data.

To reset the demo, clear this site's browser local storage (`northstar-bank-demo-v1`).

## Notes

This is a **frontend-only learning project**. There is no backend, authentication, database, real account, or money transfer. Do not use it for real financial operations.
