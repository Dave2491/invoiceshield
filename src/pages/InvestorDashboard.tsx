import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getFheInstance } from "../contracts/fhe";
import { invoiceShieldAbi } from "../contracts/InvoiceShieldABI";
import { INVOICE_SHIELD_ADDRESS } from "../contracts/config";

const panelStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #121212 0%, #0d0d0d 100%)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "20px",
  padding: "24px",
  boxShadow: "0 18px 40px rgba(0, 0, 0, 0.28)",
};

export default function InvestorDashboard() {
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [approvalResults, setApprovalResults] = useState<Record<number, string>>({});
  const [decryptingIndex, setDecryptingIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        if (!window.ethereum) return;

        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);

        if (accounts.length === 0) {
          setInvoiceCount(0);
          return;
        }

        const address = accounts[0];

        const contract = new ethers.Contract(
          INVOICE_SHIELD_ADDRESS,
          invoiceShieldAbi,
          provider
        );

        const count = await contract.getInvoiceCount(address);
        setInvoiceCount(Number(count));
      } catch (err) {
        console.error(err);
      }
    }

    fetchInvoices();
  }, []);

  async function revealApproval(index: number) {
    try {
      setDecryptingIndex(index);

      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const contract = new ethers.Contract(
        INVOICE_SHIELD_ADDRESS,
        invoiceShieldAbi,
        provider
      );

      const encryptedApproval = await contract.getInvoiceApproval(userAddress, index);
      const fhe = await getFheInstance();
      const keypair = fhe.generateKeypair();

      const startTimestamp = Math.floor(Date.now() / 1000);
      const durationDays = 7;

      const eip712 = fhe.createEIP712(
        keypair.publicKey,
        [INVOICE_SHIELD_ADDRESS],
        startTimestamp,
        durationDays
      );

      const signature = await signer.signTypedData(
        eip712.domain,
        {
          UserDecryptRequestVerification:
            eip712.types.UserDecryptRequestVerification,
        },
        eip712.message
      );

      const decrypted = await fhe.userDecrypt(
        [{ handle: encryptedApproval, contractAddress: INVOICE_SHIELD_ADDRESS }],
        keypair.privateKey,
        keypair.publicKey,
        signature,
        [INVOICE_SHIELD_ADDRESS],
        userAddress,
        startTimestamp,
        durationDays
      );

      const result = decrypted[encryptedApproval];

      setApprovalResults((prev) => ({
        ...prev,
        [index]: result ? "Approved" : "Rejected",
      }));
    } catch (err) {
      console.error(err);
      setApprovalResults((prev) => ({
        ...prev,
        [index]: "Failed",
      }));
    } finally {
      setDecryptingIndex(null);
    }
  }

  return (
    <main style={{ padding: "72px 0" }}>
      <div className="page-container">
        <div style={{ marginBottom: "30px", maxWidth: "760px" }}>
          <div style={{ color: "#facc15", fontSize: "14px", fontWeight: "700" }}>
            Private Eligibility Results
          </div>

          <h1 style={{ margin: "8px 0 12px", fontSize: "clamp(34px, 5vw, 44px)", fontWeight: "900", lineHeight: "1.08" }}>
            Confidential Eligibility Dashboard
          </h1>

          <p style={{ color: "#a1a1aa", lineHeight: "1.7", maxWidth: "720px" }}>
            Review encrypted invoice profiles and reveal only the final financing
            decision. Amount, risk score, and term remain hidden.
          </p>
        </div>

        {invoiceCount === 0 ? (
          <div style={panelStyle}>
            <div style={{ color: "#e4e4e7", fontWeight: "800", marginBottom: "6px" }}>
              No encrypted invoice profiles found
            </div>
            <div style={{ color: "#a1a1aa", lineHeight: "1.6" }}>
              Submit an encrypted invoice profile first, then return here to reveal
              the private approval result.
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px" }}>
            {Array.from({ length: invoiceCount }).map((_, index) => (
              <div
                key={index}
                style={{
                  ...panelStyle,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ minWidth: "220px" }}>
                  <div style={{ fontWeight: "800", marginBottom: "6px", fontSize: "16px" }}>
                    Invoice Profile #{index + 1}
                  </div>

                  <div style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: "1.6" }}>
                    Encrypted amount, risk score, and term hidden
                  </div>
                </div>

                {approvalResults[index] ? (
                  <div
                    style={{
                      padding: "8px 14px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "800",
                      background:
                        approvalResults[index] === "Approved"
                          ? "rgba(74, 222, 128, 0.12)"
                          : approvalResults[index] === "Rejected"
                          ? "rgba(248, 113, 113, 0.12)"
                          : "rgba(250, 204, 21, 0.12)",
                      color:
                        approvalResults[index] === "Approved"
                          ? "#4ade80"
                          : approvalResults[index] === "Rejected"
                          ? "#f87171"
                          : "#facc15",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {approvalResults[index]}
                  </div>
                ) : (
                  <button
                    onClick={() => revealApproval(index)}
                    disabled={decryptingIndex === index}
                    className="button-primary"
                    style={{
                      opacity: decryptingIndex === index ? 0.55 : 1,
                      cursor: decryptingIndex === index ? "not-allowed" : "pointer",
                      minWidth: "150px",
                      fontWeight: "800",
                    }}
                  >
                    {decryptingIndex === index ? "Decrypting..." : "Reveal Result"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}