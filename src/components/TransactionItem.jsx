import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { formatDate, formatMoney } from '../utils/format';
export default function TransactionItem({ transaction }) {
  const isDeposit = transaction.type === 'deposit';
  return <li className="transaction"><div className={`transaction-icon ${isDeposit ? 'incoming' : 'outgoing'}`}>{isDeposit ? <ArrowDownLeft size={20}/> : <ArrowUpRight size={20}/>}</div><div className="transaction-detail"><strong>{isDeposit ? 'Money deposited' : 'Money withdrawn'}</strong><small>{formatDate(transaction.date)}</small></div><strong className={isDeposit ? 'positive' : 'negative'}>{isDeposit ? '+' : '−'}{formatMoney(transaction.amount)}</strong></li>;
}
