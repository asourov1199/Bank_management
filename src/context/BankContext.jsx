import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  account,
  applyTransaction,
  createInitialState,
  restoreState,
  STORAGE_KEY,
} from "../utils/banking";
const BankContext = createContext(null);
export function BankProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      return restoreState(localStorage.getItem(STORAGE_KEY));
    } catch {
      return createInitialState();
    }
  });
  const current = useRef(state);
  const [storageError, setStorageError] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setStorageError("");
    } catch {
      setStorageError(
        "Browser storage is unavailable. Your changes will last only for this session.",
      );
    }
  }, [state]);
  function transact(type, amount) {
    const next = applyTransaction(
      current.current,
      type,
      amount,
      crypto.randomUUID(),
      new Date().toISOString(),
    );
    current.current = next;
    setState(next);
  }
  const totalDeposited = state.transactions
    .filter((tx) => tx.type === "deposit")
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalWithdrawn = state.transactions
    .filter((tx) => tx.type === "withdrawal")
    .reduce((sum, tx) => sum + tx.amount, 0);
  return (
    <BankContext.Provider
      value={{ ...state, account, totalDeposited, totalWithdrawn, transact }}
    >
      {storageError && (
        <div className="storage-warning" role="alert">
          {storageError}
        </div>
      )}
      {children}
    </BankContext.Provider>
  );
}
export function useBank() {
  const context = useContext(BankContext);
  if (!context) throw new Error("useBank must be used inside BankProvider.");
  return context;
}
