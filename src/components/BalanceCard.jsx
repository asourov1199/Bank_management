import { formatMoney } from "../utils/banking";
export default function BalanceCard({ label, amount, variant = "", caption }) {
  return (
    <article className={`balance-card ${variant}`}>
      <p>
        {label}
        <span aria-hidden="true">
          {variant === "primary" ? "◈" : variant === "deposit" ? "↙" : "↗"}
        </span>
      </p>
      <h2>{formatMoney(amount)}</h2>
      <small>{caption}</small>
    </article>
  );
}
