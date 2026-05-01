import { NavLink, Link } from "react-router-dom";
import WalletButton from "./WalletButton";

export default function Navbar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#fff" : "#a1a1aa",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "14px",
    padding: "8px 14px",
    borderRadius: "999px",
    background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
    transition: "all 0.2s ease",
    border: isActive
      ? "1px solid rgba(255,255,255,0.12)"
      : "1px solid transparent",
  });

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(10,10,10,0.7)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        className="page-container"
        style={{
          minHeight: "72px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
          paddingTop: "14px",
          paddingBottom: "14px",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: 900,
            fontSize: "20px",
            letterSpacing: "-0.04em",
          }}
        >
          InvoiceShield
        </Link>

        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          <NavLink to="/app" style={linkStyle}>
            Submit
          </NavLink>

          <NavLink to="/investor" style={linkStyle}>
            Dashboard
          </NavLink>

          <NavLink to="/about" style={linkStyle}>
            About
          </NavLink>

          <WalletButton />
        </div>
      </div>
    </nav>
  );
}