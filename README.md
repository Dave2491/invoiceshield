# InvoiceShield

Confidential Invoice Financing powered by Fully Homomorphic Encryption (FHE).

InvoiceShield enables businesses to submit financial data and receive financing decisions without exposing sensitive information onchain.

---
## Live Application
https://invoiceshield-rose.vercel.app

## Demo Video
https://drive.google.com/file/d/1VOkHnWfAl5m9FVh8CGuvNv_ZfWCrihTq/view?usp=sharing

---

## Usage Notes

- This application is optimized for desktop wallet environments  
- Use a browser wallet such as MetaMask on the Sepolia network  

---

## 🧠 Problem

Blockchains are transparent by design.

This makes it difficult to build financial applications because:
- Invoice amounts become public
- Business risk profiles are exposed
- Sensitive financial data cannot remain private

---

## 🔐 Solution

InvoiceShield uses Zama’s FHEVM to enable:

- Encryption of financial data in the browser
- Private computation on encrypted data
- Selective disclosure of results

No sensitive data is ever revealed onchain.

---

## ⚙️ How It Works

### 1. User submits financial profile
- Invoice amount  
- Business risk score  
- Financing term (derived from due date)

### 2. Data is encrypted client-side  
Inputs are encrypted before being sent to the blockchain.

### 3. Smart contract evaluates privately  
The contract performs computation directly on encrypted values.

### 4. Approval logic (private)

An invoice is approved only if:

- Amount ≤ 5000  
- Risk score ≥ 70  
- Term ≤ 90 days  

This logic runs without decrypting any input.

### 5. User reveals result

Only the final decision can be decrypted:
- Approved  
- Rejected  

---

## 🔍 Why FHE Matters

Without FHE:
- All financial data would be publicly visible  
- Confidential finance is impossible onchain  

With FHE:
- Data remains encrypted at all times  
- Computation happens without revealing inputs  
- Real-world financial use cases become viable  

InvoiceShield demonstrates how FHE enables **confidential lending and underwriting** onchain.

---

## 🧪 Features

- Encrypted invoice submission  
- Multi-factor private evaluation  git add README.md
- Onchain computation using FHE  
 

---

## 🛠️ Tech Stack

- React  
- TypeScript  
- ethers.js  
- Solidity  
- Hardhat  
- Zama FHEVM  
- Sepolia Testnet  

---

## 📦 Setup

### Clone

```bash
git clone <your-repo-url>
cd invoiceshield
``` 
### Install dependencies

```bash
npm install
```

---

### Configure environment

Create a `.env` file in the root:

```env
SEPOLIA_RPC_URL=your_rpc_url
PRIVATE_KEY=your_test_wallet_private_key
```

---
## ⚙️ Smart Contract

### Compile

```bash
npx hardhat compile
```

---
### Deploy

```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

---
### Update contract address

After deploying, update your contract address in:

```ts
src/contracts/config.ts
```

```ts
export const INVOICE_SHIELD_ADDRESS = "0x014978b112861952529CF2b75DEe809A2520e617";
```

---
## 🧪 Run App

```bash
npm run dev
```

---
## 🧭 Usage

1. Connect wallet  
2. Submit encrypted invoice profile  
3. Navigate to dashboard  
4. Reveal approval result  

---
## 🌐 Network

Sepolia Testnet

---
## 📜 Contract Address

```
0x014978b112861952529CF2b75DEe809A2520e617
```

---
## 📌 Summary

InvoiceShield demonstrates how Fully Homomorphic Encryption enables confidential financial applications by allowing:

- Private data submission  
- Encrypted computation  
- Selective disclosure of results  

This unlocks real-world use cases like lending, underwriting, and risk analysis onchain.

---
## 🧾 License

MIT