import { useRef, useState } from "react";
import { formatMoney, parseAmount } from "../utils/banking";
export default function MoneyForm({ type, balance, onTransaction }) {
  const withdrawal = type === "withdrawal";
  const inputRef = useRef(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const [pending, setPending] = useState(null);
  function complete(value) {
    try {
      onTransaction(type, value);
      setMessage({
        success: true,
        text: `${formatMoney(value)} ${withdrawal ? "withdrawn" : "deposited"} successfully.`,
      });
      setAmount("");
    } catch (error) {
      setMessage({ success: false, text: error.message });
    }
    setPending(null);
    inputRef.current?.focus();
  }
  function handleSubmit(event) {
    event.preventDefault();
    setMessage(null);
    try {
      const value = parseAmount(amount);
      if (withdrawal && value > balance)
        throw new Error("Insufficient balance. Enter a smaller amount.");
      if (withdrawal) setPending(value);
      else complete(value);
    } catch (error) {
      setMessage({ success: false, text: error.message });
      inputRef.current?.focus();
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="amount">Amount in BDT</label>
        <div className="amount-input">
          <span aria-hidden="true">BDT</span>
          <input
            autoFocus
            ref={inputRef}
            id="amount"
            name="amount"
            inputMode="decimal"
            autoComplete="off"
            placeholder="0.00"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              setMessage(null);
            }}
            aria-describedby="amount-help amount-message"
            aria-invalid={message && !message.success ? true : undefined}
            disabled={pending !== null}
          />
        </div>
        <p id="amount-help" className="input-help">
          Enter a positive amount with up to 2 decimal places.
        </p>
        <button className="button" type="submit" disabled={pending !== null}>
          {withdrawal ? "Review withdrawal" : "Deposit money"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
        <div id="amount-message" role={message?.success ? "status" : "alert"}>
          {message && (
            <p className={`message ${message.success ? "success" : "error"}`}>
              {message.text}
            </p>
          )}
        </div>
      </form>
      {pending !== null && (
        <div
          className="confirmation"
          role="region"
          aria-label="Confirm withdrawal"
        >
          <h3>Confirm your withdrawal</h3>
          <p>
            Withdraw <strong>{formatMoney(pending)}</strong> from your account?
          </p>
          <p>Remaining balance: {formatMoney(balance - pending)}</p>
          <div className="button-row">
            <button
              type="button"
              className="button"
              autoFocus
              onClick={() => complete(pending)}
            >
              Confirm withdrawal
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => {
                setPending(null);
                inputRef.current?.focus();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
