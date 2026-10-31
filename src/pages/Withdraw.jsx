import { useBank } from "../context/BankContext";
import WithdrawForm from "../components/WithdrawForm";
import { formatMoney } from "../utils/banking";
export default function Withdraw() {
  const { balance, transact } = useBank();
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">YOU'RE IN CONTROL</p>
          <h1>
            Withdraw money<span>.</span>
          </h1>
          <p>Review and confirm before money leaves your demo account.</p>
        </div>
      </div>
      <section className="money-layout">
        <div className="panel form-panel">
          <h2>Make a withdrawal</h2>
          <p className="muted">
            You can withdraw up to your available balance.
          </p>
          <WithdrawForm balance={balance} onTransaction={transact} />
        </div>
        <aside className="money-note">
          <p className="eyebrow">AVAILABLE BALANCE</p>
          <h2>{formatMoney(balance)}</h2>
          <p>
            Check your amount carefully. You will confirm the withdrawal before
            your balance changes.
          </p>
          <hr />
          <strong>Your balance stays in the green.</strong>
          <p>Withdrawals above your available balance are prevented.</p>
        </aside>
      </section>
    </>
  );
}
