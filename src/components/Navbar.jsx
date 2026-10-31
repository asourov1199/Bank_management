import { NavLink } from "react-router-dom";
const links = [
  ["/", "Overview", "01"],
  ["/deposit", "Deposit", "02"],
  ["/withdraw", "Withdraw", "03"],
  ["/transactions", "Transaction History", "04"],
];
export default function Navbar() {
  return (
    <aside className="sidebar">
      <NavLink to="/" className="brand">
        <span className="brand-icon" aria-hidden="true">
          g.
        </span>
        <span>
          greenline<span className="brand-sub">BANK MANAGEMENT</span>
        </span>
      </NavLink>
      <p className="nav-caption">YOUR WORKSPACE</p>
      <nav aria-label="Main navigation">
        {links.map(([to, label, number]) => (
          <NavLink
            end={to === "/"}
            key={to}
            to={to}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <span className="nav-number" aria-hidden="true">
              {number}
            </span>
            {label}
            <span className="nav-arrow" aria-hidden="true">
              ↗
            </span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-note">
        <span className="status-dot" /> A little practice. A lot of possibility.
        <p>Your personal banking workspace, built with React.</p>
      </div>
      <div className="sidebar-footer">FRONTEND PRACTICE PROJECT</div>
    </aside>
  );
}
