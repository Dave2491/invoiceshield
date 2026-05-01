import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function WalletButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function checkConnectedWallet() {
      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);

      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }

    checkConnectedWallet();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts.length > 0 ? accounts[0] : null);
      });
    }
  }, []);

  async function connectWallet() {
    if (!window.ethereum) {
      setMessage("MetaMask not detected");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);

      setAccount(accounts[0]);
      setMessage("");
    } catch (error: any) {
      console.error(error);

      if (error?.code === 4001) {
        setMessage("User cancelled connection request");
      } else {
        setMessage("Wallet connection failed");
      }
    } finally {
      setLoading(false);
    }
  }

  function disconnectWallet() {
    setAccount(null);
    setMessage("Wallet disconnected");
  }

  return (
    <div style={{ display: "grid", gap: "6px", justifyItems: "end" }}>
      {account ? (
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <button
            type="button"
            style={{
              background: "rgba(34, 197, 94, 0.12)",
              color: "#4ade80",
              border: "1px solid rgba(34, 197, 94, 0.25)",
              borderRadius: "999px",
              padding: "10px 14px",
              fontWeight: "800",
            }}
          >
            {account.slice(0, 6)}...{account.slice(-4)}
          </button>

          <button
            type="button"
            onClick={disconnectWallet}
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              color: "#e4e4e7",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "999px",
              padding: "10px 14px",
              fontWeight: "700",
            }}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={connectWallet}
          disabled={loading}
          className="button-primary"
          style={{
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "800",
          }}
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}

      {message && (
        <div
          style={{
            color: message.includes("cancelled") || message.includes("failed")
              ? "#f87171"
              : "#a1a1aa",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}