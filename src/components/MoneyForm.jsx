import { useRef, useState } from 'react';
import { useBank } from '../context/BankContext';
import { formatMoney } from '../utils/format';
export default function MoneyForm({ type }) {
  const [amount, setAmount] = useState('');
  const [feedback, setFeedback] = useState(null);
  const inputRef = useRef(null);
  const { balance, addTransaction } = useBank();
  const isWithdraw = type === 'withdrawal';
  const label = isWithdraw ? 'Withdraw money' : 'Deposit money';

  function handleSubmit(event) {
    event.preventDefault();
    const numeric = Number(amount);
    if (!amount.trim() || !Number.isFinite(numeric) || numeric <= 0 || !/^\d+(\.\d{1,2})?$/.test(amount.trim())) {
      setFeedback({ ok: false, message: 'Enter a valid amount greater than zero (up to 2 decimal places).' });
      inputRef.current?.focus();
      return;
    }
    if (isWithdraw && numeric > balance) {
      setFeedback({ ok: false, message: 'Insufficient balance. Please enter a smaller amount.' });
      return;
    }
    if (isWithdraw && !window.confirm(`Confirm withdrawal of ${formatMoney(numeric)}?`)) return;
    const result = addTransaction(type, numeric);
    setFeedback(result);
    if (result.ok) setAmount('');
    inputRef.current?.focus();
  }

  return <div className="form-card"><div className="form-card-heading"><h2>{label}</h2><p>{isWithdraw ? 'Move funds out of your account.' : 'Add funds to your account balance.'}</p></div><form onSubmit={handleSubmit} noValidate><label htmlFor="amount">Amount (USD)</label><div className="amount-field"><span>$</span><input ref={inputRef} id="amount" type="number" min="0.01" step="0.01" placeholder="0.00" value={amount} onChange={e => { setAmount(e.target.value); setFeedback(null); }} autoFocus/></div><p className="helper">Available balance: <strong>{formatMoney(balance)}</strong></p>{feedback && <div role="alert" className={`feedback ${feedback.ok ? 'success' : 'error'}`}>{feedback.message}</div>}<button className="primary-button" type="submit">{isWithdraw ? 'Confirm withdrawal' : 'Make deposit'}</button></form></div>;
}
