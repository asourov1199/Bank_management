import { createContext, useContext, useEffect, useState } from 'react';

const BankContext = createContext(null);
const STORAGE_KEY = 'northstar-bank-demo-v1';
const initialAccount = { name: 'Alex Morgan', number: '••••  ••••  4829', openingBalance: 12500, transactions: [] };

function loadAccount() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved.openingBalance === 'number' && Array.isArray(saved.transactions)) return saved;
  } catch { /* Ignore corrupt local demo data. */ }
  return initialAccount;
}

export function BankProvider({ children }) {
  const [account, setAccount] = useState(loadAccount);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(account)); }, [account]);

  const balance = account.transactions.reduce((total, item) => total + (item.type === 'deposit' ? item.amount : -item.amount), account.openingBalance);
  const totalDeposited = account.transactions.filter(item => item.type === 'deposit').reduce((sum, item) => sum + item.amount, 0);
  const totalWithdrawn = account.transactions.filter(item => item.type === 'withdrawal').reduce((sum, item) => sum + item.amount, 0);

  function addTransaction(type, amount) {
    const cents = Math.round(Number(amount) * 100);
    if (!Number.isSafeInteger(cents) || cents <= 0) return { ok: false, message: 'Enter an amount greater than zero.' };
    const value = cents / 100;
    if (type !== 'deposit' && type !== 'withdrawal') return { ok: false, message: 'Invalid transaction type.' };
    if (type === 'withdrawal' && value > balance) return { ok: false, message: 'Insufficient balance. Please enter a smaller amount.' };
    const transaction = { id: crypto.randomUUID(), type, amount: value, date: new Date().toISOString() };
    setAccount(previous => ({ ...previous, transactions: [transaction, ...previous.transactions] }));
    return { ok: true, message: `${type === 'deposit' ? 'Deposit' : 'Withdrawal'} completed successfully.` };
  }

  return <BankContext.Provider value={{ account, balance, totalDeposited, totalWithdrawn, transactions: account.transactions, addTransaction }}>{children}</BankContext.Provider>;
}

export function useBank() {
  const context = useContext(BankContext);
  if (!context) throw new Error('useBank must be used inside BankProvider');
  return context;
}
