const panelStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #121212 0%, #0d0d0d 100%)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "20px",
  padding: "24px",
  marginBottom: "24px",
  boxShadow: "0 18px 40px rgba(0, 0, 0, 0.28)",
};

export default function About() {
  return (
    <main style={{ padding: "80px 0" }}>
      <div className="page-container" style={{ maxWidth: "850px" }}>
        <div style={{ marginBottom: "30px" }}>
          <div style={{ color: "#facc15", fontSize: "14px", fontWeight: "700" }}>
            About the protocol
          </div>

          <h1
            style={{
              fontSize: "clamp(34px, 5vw, 44px)",
              fontWeight: "900",
              margin: "8px 0 14px",
              lineHeight: "1.08",
            }}
          >
            About InvoiceShield
          </h1>

          <p style={{ color: "#a1a1aa", lineHeight: "1.7", fontSize: "16px" }}>
            InvoiceShield is a confidential finance application built using Fully
            Homomorphic Encryption (FHE). It enables businesses to submit financial
            data and receive financing decisions without exposing sensitive
            information onchain.
          </p>
        </div>

        <div style={panelStyle}>
          <h2 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "12px" }}>
            How it works
          </h2>

          <ul style={{ color: "#a1a1aa", lineHeight: "1.9", paddingLeft: "20px", marginBottom: 0 }}>
            <li>Users input invoice amount, risk score, and financing term</li>
            <li>All inputs are encrypted in the browser before submission</li>
            <li>The smart contract evaluates eligibility privately using FHE</li>
            <li>No sensitive data is ever revealed onchain</li>
            <li>Only the final approval result can be decrypted by the user</li>
          </ul>
        </div>

        <div style={panelStyle}>
          <h2 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "12px" }}>
            Private eligibility logic
          </h2>

          <p style={{ color: "#a1a1aa", lineHeight: "1.7" }}>
            Financing approval is determined privately using encrypted inputs. An
            invoice is approved only if:
          </p>

          <ul
            style={{
              color: "#a1a1aa",
              lineHeight: "1.9",
              paddingLeft: "20px",
              marginTop: "10px",
            }}
          >
            <li>Invoice amount is ≤ 5000</li>
            <li>Risk score is ≥ 70</li>
            <li>Financing term is ≤ 90 days</li>
          </ul>

          <p style={{ color: "#71717a", marginTop: "12px", fontSize: "14px", lineHeight: "1.6" }}>
            These conditions are evaluated without decrypting the underlying data.
          </p>
        </div>

        <div
          style={{
            background: "rgba(250, 204, 21, 0.08)",
            border: "1px solid rgba(250, 204, 21, 0.22)",
            borderRadius: "20px",
            padding: "24px",
            boxShadow: "0 18px 40px rgba(0, 0, 0, 0.22)",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "12px" }}>
            Why FHE matters
          </h2>

          <p style={{ color: "#d4d4d8", lineHeight: "1.7" }}>
            Traditional blockchains expose all transaction data publicly. This
            makes it impossible to build privacy-preserving financial systems.
          </p>

          <p style={{ color: "#d4d4d8", lineHeight: "1.7", marginTop: "10px" }}>
            InvoiceShield uses FHE to enable computation on encrypted data,
            allowing financial decisions to be made without revealing sensitive
            business information.
          </p>
        </div>
      </div>
    </main>
  );
}