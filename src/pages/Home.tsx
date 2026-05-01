import { Link } from "react-router-dom";
import { Lock, ShieldCheck, Cpu } from "lucide-react";

const cardStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #121212 0%, #0d0d0d 100%)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "18px",
  padding: "24px",
  boxShadow: "0 18px 40px rgba(0, 0, 0, 0.28)",
};

const iconWrapStyle: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  background: "rgba(250, 204, 21, 0.1)",
  border: "1px solid rgba(250, 204, 21, 0.18)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const hoverCardProps = {
  style: {
    ...cardStyle,
    transition: "all 0.2s ease",
  },
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(-4px)";
  },
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "translateY(0)";
  },
};

export default function Home() {
  return (
    <main style={{ padding: "88px 0" }}>
      <div className="page-container">
        <div style={{ maxWidth: "820px", marginBottom: "56px" }}>
          <div style={{ color: "#facc15", fontSize: "14px", fontWeight: "700", marginBottom: "14px" }}>
            Confidential finance powered by FHE
          </div>

          <h1 style={{ fontSize: "clamp(42px, 7vw, 64px)", fontWeight: "900", lineHeight: "1.05", marginBottom: "18px" }}>
            Confidential Invoice Financing
          </h1>

          <p style={{ color: "#a1a1aa", fontSize: "20px", lineHeight: "1.7", marginBottom: "30px", maxWidth: "720px" }}>
            Submit encrypted invoice data and prove eligibility without revealing
            sensitive business information. Powered by{" "}
<span style={{ color: "#facc15", fontWeight: 700 }}>
  Fully Homomorphic Encryption
</span>.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/app" className="button-primary" style={{ textDecoration: "none" }}>
              Submit Invoice
            </Link>

            <Link to="/investor" className="button-secondary" style={{ textDecoration: "none" }}>
              View Dashboard
            </Link>
          </div>
        </div>

        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <div {...hoverCardProps}>
            <div style={iconWrapStyle}>
              <Lock size={20} color="#facc15" />
            </div>
            <div style={{ fontWeight: "800", marginTop: "16px", fontSize: "17px" }}>
              Encrypted Inputs
            </div>
            <div style={{ color: "#a1a1aa", fontSize: "14px", marginTop: "8px", lineHeight: "1.6" }}>
              Invoice amount, risk score, and term are encrypted in the browser.
            </div>
          </div>

          <div {...hoverCardProps}>
            <div style={iconWrapStyle}>
              <Cpu size={20} color="#facc15" />
            </div>
            <div style={{ fontWeight: "800", marginTop: "16px", fontSize: "17px" }}>
              Private Evaluation
            </div>
            <div style={{ color: "#a1a1aa", fontSize: "14px", marginTop: "8px", lineHeight: "1.6" }}>
              Smart contract evaluates eligibility without decrypting data.
            </div>
          </div>

          <div {...hoverCardProps}>
            <div style={iconWrapStyle}>
              <ShieldCheck size={20} color="#facc15" />
            </div>
            <div style={{ fontWeight: "800", marginTop: "16px", fontSize: "17px" }}>
              Selective Disclosure
            </div>
            <div style={{ color: "#a1a1aa", fontSize: "14px", marginTop: "8px", lineHeight: "1.6" }}>
              Only the final approval result can be revealed by the user.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}