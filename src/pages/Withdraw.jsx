import { ArrowUpRight } from 'lucide-react';
import WithdrawForm from '../components/WithdrawForm';
export default function Withdraw() { return <><div className="page-heading"><div><span className="eyebrow">TRANSACTIONS</span><h1>Withdraw funds</h1><p>Withdraw from your available balance.</p></div><span className="heading-icon outgoing"><ArrowUpRight size={25}/></span></div><WithdrawForm/></>; }
