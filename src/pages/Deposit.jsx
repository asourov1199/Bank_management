import { useBank } from "../context/BankContext";
import DepositForm from "../components/DepositForm";
import { formatMoney } from "../utils/banking";
export default function Deposit() {
  const { balance, transact } = useBank();
  return (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">MAKE ROOM FOR MORE</p>
          <h1>
            Deposit money<span>.</span>
          </h1>
          <p>Add money to your simulated savings account.</p>
        </div>
      </div>
      <section className="money-layout">
        <div className="panel form-panel">
          <h2>Add to your balance</h2>
          <p className="muted">
            Your balance updates as soon as the deposit is completed.
          </p>
          <DepositForm balance={balance} onTransaction={transact} />
        </div>
        <aside className="money-note">
          <p className="eyebrow">AVAILABLE BALANCE</p>
          <h2>{formatMoney(balance)}</h2>
          <p>
            Every deposit appears in your transaction history. Your progress is
            saved in this browser.
          </p>
          <hr />
          <strong>A practice space for your money skills.</strong>
          <p>This is a demo. No real money is transferred.</p>
        </aside>
      </section>
    </>
  );
}
