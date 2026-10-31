// Store money in integer poisha to avoid floating-point rounding errors.
export const OPENING_BALANCE = 2500000;
export const MAX_BALANCE = 99999999999;
export const STORAGE_KEY = "greenline-bank-v1";
export const account = {
  name: "Ashraful Islam Sourov",
  number: "1020 4589 0021",
  type: "Savings account",
  currency: "BDT",
};
export const formatMoney = (poisha) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 2,
  }).format(poisha / 100);
export function parseAmount(value) {
  const text = String(value).trim();
  if (!/^\d+(\.\d{1,2})?$/.test(text))
    throw new Error("Enter a valid amount with up to two decimal places.");
  const [whole, fraction = ""] = text.split(".");
  const amount = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  if (!Number.isSafeInteger(amount) || amount <= 0)
    throw new Error("Enter an amount greater than zero.");
  if (amount > MAX_BALANCE)
    throw new Error("This amount exceeds the demo account limit.");
  return amount;
}
export const createInitialState = () => ({
  balance: OPENING_BALANCE,
  transactions: [],
});
export function applyTransaction(state, type, amount, id, date) {
  if (!["deposit", "withdrawal"].includes(type))
    throw new Error("Unknown transaction type.");
  if (!Number.isSafeInteger(amount) || amount <= 0 || amount > MAX_BALANCE)
    throw new Error("Enter a valid positive amount.");
  if (type === "withdrawal" && amount > state.balance)
    throw new Error("Insufficient balance. Enter a smaller amount.");
  const balance = state.balance + (type === "deposit" ? amount : -amount);
  if (balance > MAX_BALANCE)
    throw new Error("The demo account balance limit would be exceeded.");
  return {
    balance,
    transactions: [{ id, type, amount, date }, ...state.transactions],
  };
}
export function restoreState(raw) {
  try {
    const saved = JSON.parse(raw);
    if (!saved || !Array.isArray(saved.transactions))
      return createInitialState();
    // Replay the ledger so a broken stored balance cannot disagree with history.
    let state = createInitialState();
    const ids = new Set();
    for (const tx of [...saved.transactions].reverse()) {
      if (
        !tx ||
        typeof tx.id !== "string" ||
        !tx.id ||
        ids.has(tx.id) ||
        typeof tx.date !== "string" ||
        Number.isNaN(Date.parse(tx.date))
      )
        return createInitialState();
      ids.add(tx.id);
      state = applyTransaction(state, tx.type, tx.amount, tx.id, tx.date);
    }
    return state;
  } catch {
    return createInitialState();
  }
}
