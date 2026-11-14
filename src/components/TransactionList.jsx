import { ReceiptText } from 'lucide-react';
import TransactionItem from './TransactionItem';
export default function TransactionList({ transactions }) {
  if (!transactions.length) return <div className="empty"><ReceiptText size={30}/><strong>No transactions yet</strong><p>Your deposits and withdrawals will appear here.</p></div>;
  return <ul className="transaction-list">{transactions.map(item => <TransactionItem key={item.id} transaction={item}/>)}</ul>;
}
