import { formatMoney } from "../utils/banking";
export default function TransactionItem({ transaction }) {
  const deposit = transaction.type === "deposit";
  return (
    <li className="transaction-row">
      <span
        className={`transaction-icon ${deposit ? "in" : "out"}`}
        aria-hidden="true"
      >
        {deposit ? "↙" : "↗"}
      </span>
      <div className="transaction-description">
        <strong>{deposit ? "Deposit" : "Withdrawal"}</strong>
        <span>
          {deposit
            ? "Added to savings account"
            : "Withdrawn from savings account"}
        </span>
      </div>
      <time dateTime={transaction.date}>
        {new Date(transaction.date).toLocaleString("en-BD", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </time>
      <strong className={`transaction-amount ${deposit ? "in" : "out"}`}>
        {deposit ? "+" : "−"}
        {formatMoney(transaction.amount)}
      </strong>
    </li>
  );
}
