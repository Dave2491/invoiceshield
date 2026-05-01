export const invoiceShieldAbi = [
  {
    inputs: [
      { internalType: "bytes32", name: "handle", type: "bytes32" },
      { internalType: "address", name: "sender", type: "address" },
    ],
    name: "SenderNotAllowedToUseHandle",
    type: "error",
  },
  {
    inputs: [],
    name: "ZamaProtocolUnsupported",
    type: "error",
  },
  {
    inputs: [],
    name: "confidentialProtocolId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "getInvoiceApproval",
    outputs: [{ internalType: "ebool", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getInvoiceCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "externalEuint32", name: "inputAmount", type: "bytes32" },
      { internalType: "externalEuint32", name: "inputRiskScore", type: "bytes32" },
      { internalType: "externalEuint32", name: "inputTermDays", type: "bytes32" },
      { internalType: "bytes", name: "inputProof", type: "bytes" },
    ],
    name: "submitInvoice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];