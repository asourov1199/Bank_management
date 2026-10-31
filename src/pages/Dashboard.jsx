import { Link } from "react-router-dom";
import { useBank } from "../context/BankContext";
import BalanceCard from "../components/BalanceCard";
import TransactionList from "../components/TransactionList";
export default function Dashboard() {
  const { account, balance, totalDeposited, totalWithdrawn, transactions } =
    useBank();
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOUR MONEY, AT A GLANCE</p>
          <h1>
            Account overview<span>.</span>
          </h1>
          <p>A clear view of your balance and everyday transactions.</p>
        </div>
        <span className="pill">
          <span className="status-dot" /> Account active
        </span>
      </div>
      <div className="balance-grid">
        <BalanceCard
          label="Available balance"
          amount={balance}
          variant="primary"
          caption="Ready when you are"
        />
        <BalanceCard
          label="Total deposited"
          amount={totalDeposited}
          variant="deposit"
          caption="Money added since you started"
        />
        <BalanceCard
          label="Total withdrawn"
          amount={totalWithdrawn}
          variant="withdrawal"
          caption="Money withdrawn since you started"
        />
      </div>
      <section className="account-panel">
        <div>
          <p className="eyebrow">ACCOUNT DETAILS</p>
          <h2>{account.name}</h2>
          <p>
            {account.type} <span className="separator">/</span> {account.number}
          </p>
        </div>
        <div className="quick-actions">
          <Link className="button" to="/deposit">
            Deposit money <span aria-hidden="true">↙</span>
          </Link>
          <Link className="button secondary" to="/withdraw">
            Withdraw <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Recent activity</h2>
            <p>Your latest account movements, all in one place.</p>
          </div>
          <Link className="text-link" to="/transactions">
            View all <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <TransactionList transactions={transactions.slice(0, 5)} />
      </section>
      <div className="tip">
        <span aria-hidden="true">✳</span>
        <p>
          <strong>Small steps. Better habits.</strong> Keep track of what comes
          in and what goes out.
        </p>
        <span className="tip-label">BANK SMARTER</span>
      </div>
    </>
  );
}
