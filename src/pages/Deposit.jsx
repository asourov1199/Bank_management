import { ArrowDownLeft } from 'lucide-react';
import DepositForm from '../components/DepositForm';
export default function Deposit() { return <><div className="page-heading"><div><span className="eyebrow">TRANSACTIONS</span><h1>Deposit funds</h1><p>Grow your balance in just a few steps.</p></div><span className="heading-icon incoming"><ArrowDownLeft size={25}/></span></div><DepositForm/></>; }
