import TransactionItem from "./TransactionItem";
export default function TransactionList({ transactions }) {
  if (!transactions.length)
    return (
      <div className="empty-state">
        <span aria-hidden="true">↔</span>
        <h3>A fresh start</h3>
        <p>
          Your transactions will appear here after your first deposit or
          withdrawal.
        </p>
      </div>
    );
  return (
    <ul className="transaction-list">
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  );
}
