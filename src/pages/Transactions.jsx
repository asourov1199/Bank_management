import { History } from 'lucide-react';
import TransactionList from '../components/TransactionList';
import { useBank } from '../context/BankContext';
export default function Transactions() { const { transactions } = useBank(); return <><div className="page-heading"><div><span className="eyebrow">ACCOUNT ACTIVITY</span><h1>Transaction history</h1><p>A record of all your deposits and withdrawals.</p></div><span className="date-pill">{transactions.length} transactions</span></div><section className="panel history-panel"><div className="section-heading"><h2><History size={20}/> All transactions</h2></div><TransactionList transactions={transactions}/></section></>; }
