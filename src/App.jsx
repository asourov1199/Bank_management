import { Link, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transactions from "./pages/Transactions";
import { useBank } from "./context/BankContext";
const titles = {
  "/": "Dashboard",
  "/deposit": "Deposit",
  "/withdraw": "Withdraw",
  "/transactions": "Transaction History",
};
export default function App() {
  const { account } = useBank();
  const { pathname } = useLocation();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="app-layout">
        <Navbar />
        <div className="workspace">
          <header className="topbar">
            <p>
              Personal banking <span>/</span>{" "}
              <strong>{titles[pathname] || "Page not found"}</strong>
            </p>
            <div className="profile">
              <span className="avatar" aria-hidden="true">
                AS
              </span>
              <div>
                <strong>{account.name}</strong>
                <small>Personal account</small>
              </div>
            </div>
          </header>
          <main id="main" key={pathname}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route
                path="*"
                element={
                  <section className="panel">
                    <h1>Page not found</h1>
                    <Link to="/">Return to dashboard</Link>
                  </section>
                }
              />
            </Routes>
          </main>
          <footer className="page-footer">
            <span>
              © {new Date().getFullYear()} Greenline Bank · React assignment
            </span>
            <span>Demo account · No real money</span>
          </footer>
        </div>
      </div>
    </>
  );
}
