import { formatMoney } from '../utils/format';
export default function BalanceCard({ label, amount, icon: Icon, variant = '' }) {
  return <div className={`stat-card ${variant}`}><div className="stat-top"><span>{label}</span><span className="stat-icon"><Icon size={20}/></span></div><strong>{formatMoney(amount)}</strong><small>{variant === 'balance' ? 'Available to use' : 'Since account opened'}</small></div>;
}
