import { NavLink } from 'react-router-dom';
import { Landmark, LayoutDashboard, ArrowDownToLine, ArrowUpFromLine, History } from 'lucide-react';
const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/deposit', label: 'Deposit', icon: ArrowDownToLine },
  { to: '/withdraw', label: 'Withdraw', icon: ArrowUpFromLine },
  { to: '/transactions', label: 'Transactions', icon: History }
];
export default function Navbar() {
  return <aside className="sidebar"><div className="brand"><span className="brand-mark"><Landmark size={24}/></span><span>northstar<span className="brand-dot">.</span><small>BANKING DEMO</small></span></div><div className="nav-label">YOUR ACCOUNT</div><nav aria-label="Main navigation">{links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={19}/>{label}</NavLink>)}</nav><div className="sidebar-footer"><div className="avatar">AM</div><div><strong>Alex Morgan</strong><small>Personal account</small></div></div></aside>;
}
