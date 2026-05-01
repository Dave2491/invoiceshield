import { useState } from "react";
import { ethers } from "ethers";
import { Lock, ShieldCheck, Cpu, FileText } from "lucide-react";
import { getFheInstance } from "../contracts/fhe";
import { invoiceShieldAbi } from "../contracts/InvoiceShieldABI";
import { INVOICE_SHIELD_ADDRESS } from "../contracts/config";

const panelStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #121212 0%, #0d0d0d 100%)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  borderRadius: "20px",
  padding: "28px",
  boxShadow: "0 18px 40px rgba(0, 0, 0, 0.28)",
};

const inputStyle: React.CSSProperties = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  background: "#080808",
  color: "white",
  outline: "none",
};

export default function SubmitInvoice({ setInvoices }: any) {
  const [amount, setAmount] = useState("");
  const [riskScore, setRiskScore] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const today = new Date();
      const selectedDueDate = new Date(dueDate);

      const termDays = Math.ceil(
        (selectedDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (termDays <= 0) {
        setStatus("Due date must be in the future");
        return;
      }

      setStatus("Encrypting invoice profile...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const fhe = await getFheInstance();

      const input = fhe.createEncryptedInput(
        INVOICE_SHIELD_ADDRESS,
        userAddress
      );

      input.add32(Number(amount));
      input.add32(Number(riskScore));
      input.add32(termDays);

      const encryptedInput = await input.encrypt();

      setStatus("Submitting encrypted profile...");

      const contract = new ethers.Contract(
        INVOICE_SHIELD_ADDRESS,
        invoiceShieldAbi,
        signer
      );

      const tx = await contract.submitInvoice(
        encryptedInput.handles[0],
        encryptedInput.handles[1],
        encryptedInput.handles[2],
        encryptedInput.inputProof
      );

      await tx.wait();

      setInvoices((prev: any[]) => [
        ...prev,
        { id: Date.now(), status: "Submitted Onchain" },
      ]);

      setStatus("Submitted on Sepolia");
    } catch (error) {
      console.error(error);
      setStatus("Submission failed");
    }
  }

  const isBusy =
    status.includes("Encrypting") || status.includes("Submitting");

  const isDisabled = !amount || !riskScore || !dueDate || isBusy;

  return (
    <main style={{ padding: "72px 0" }}>
      <div className="page-container">
        <div style={{ marginBottom: "28px", maxWidth: "760px" }}>
          <div style={{ color: "#facc15", fontSize: "14px", fontWeight: "700" }}>
            Confidential Invoice Financing
          </div>

          <h1
            style={{
              margin: "8px 0 12px",
              fontSize: "clamp(34px, 5vw, 44px)",
              fontWeight: "900",
              lineHeight: "1.08",
            }}
          >
            Submit encrypted invoice profile
          </h1>

          <p style={{ color: "#a1a1aa", lineHeight: "1.7", fontSize: "16px" }}>
            Invoice amount, business risk score, and financing term are encrypted
            before being sent onchain. The contract evaluates eligibility privately
            and only the final approval result can be revealed.
          </p>
        </div>

        <div style={panelStyle}>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "18px" }}>
            <label style={{ display: "grid", gap: "8px" }}>
              <span style={{ color: "#e4e4e7", fontSize: "14px", fontWeight: "700" }}>
                Invoice amount
              </span>
              <input
                type="number"
                placeholder="Example: 1500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={inputStyle}
              />
            </label>

            <label style={{ display: "grid", gap: "8px" }}>
              <span style={{ color: "#e4e4e7", fontSize: "14px", fontWeight: "700" }}>
                Business risk score
              </span>
              <input
                type="number"
                min="0"
                max="100"
                placeholder="Example: 82"
                value={riskScore}
                onChange={(e) => setRiskScore(e.target.value)}
                style={inputStyle}
              />
              <span style={{ color: "#71717a", fontSize: "12px", lineHeight: "1.5" }}>
                Encrypted privately. Used for eligibility evaluation but never shown onchain.
              </span>
            </label>

            <label style={{ display: "grid", gap: "8px" }}>
              <span style={{ color: "#e4e4e7", fontSize: "14px", fontWeight: "700" }}>
                Due date
              </span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={inputStyle}
              />
            </label>

            <div
              style={{
                padding: "16px",
                borderRadius: "14px",
                background: "#080808",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "13px",
                color: "#a1a1aa",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <FileText size={16} color="#facc15" />
                <strong style={{ color: "#e4e4e7" }}>
                  Encrypted financial profile preview
                </strong>
              </div>

              <div style={{ color: "#facc15", marginTop: "10px", wordBreak: "break-all" }}>
                0x8f3a92c7e1b4...
              </div>

              <div style={{ marginTop: "6px", lineHeight: "1.6" }}>
                Amount, risk score, and term are privately evaluated with FHE.
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                borderRadius: "14px",
                background: "rgba(250, 204, 21, 0.08)",
                border: "1px solid rgba(250, 204, 21, 0.22)",
                color: "#d4d4d8",
                fontSize: "13px",
                lineHeight: "1.7",
              }}
            >
              <strong style={{ color: "#facc15" }}>Private approval rule:</strong>{" "}
              approved if amount is ≤ 5000, risk score is ≥ 70, and financing term is ≤ 90 days.
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className="button-primary"
              style={{
                opacity: isDisabled ? 0.55 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
                padding: "14px 18px",
                fontWeight: "800",
              }}
            >
              {status.includes("Encrypting")
                ? "Encrypting..."
                : status.includes("Submitting")
                ? "Submitting..."
                : "Submit Encrypted Profile"}
            </button>
          </form>

          <div
            style={{
              marginTop: "26px",
              display: "grid",
              gap: "12px",
              color: "#a1a1aa",
              fontSize: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Lock size={16} color="#facc15" />
              Financial profile encrypted in the browser
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Cpu size={16} color="#facc15" />
              Multi-factor eligibility checked privately onchain
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <ShieldCheck size={16} color="#facc15" />
              Only approval status is revealed
            </div>
          </div>

          {status && (
            <div
              style={{
                marginTop: "24px",
                padding: "14px 16px",
                borderRadius: "14px",
                background:
                  status.includes("Submitted")
                    ? "rgba(250, 204, 21, 0.1)"
                    : status.includes("failed") || status.includes("future")
                    ? "rgba(248, 113, 113, 0.12)"
                    : "rgba(255, 255, 255, 0.06)",
                color:
                  status.includes("Submitted")
                    ? "#facc15"
                    : status.includes("failed") || status.includes("future")
                    ? "#f87171"
                    : "#e4e4e7",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontWeight: "700",
              }}
            >
              {status}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}