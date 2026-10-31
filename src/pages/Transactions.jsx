import { useBank } from "../context/BankContext";
import TransactionList from "../components/TransactionList";
export default function Transactions() {
  const { transactions } = useBank();
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">THE FULL PICTURE</p>
          <h1>
            Transaction history<span>.</span>
          </h1>
          <p>Every deposit and withdrawal, newest first.</p>
        </div>
        <span className="pill">
          {transactions.length} transaction
          {transactions.length === 1 ? "" : "s"}
        </span>
      </div>
      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>All activity</h2>
            <p>Dates and times use your device's local time zone.</p>
          </div>
        </div>
        <TransactionList transactions={transactions} />
      </section>
    </>
  );
}
