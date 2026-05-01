// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, ebool, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {ZamaEthereumConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

contract InvoiceShield is ZamaEthereumConfig {
    struct Invoice {
        euint32 encryptedAmount;
        euint32 encryptedRiskScore;
        euint32 encryptedTermDays;
        ebool approved;
    }

    mapping(address => Invoice[]) private invoices;

    function submitInvoice(
        externalEuint32 inputAmount,
        externalEuint32 inputRiskScore,
        externalEuint32 inputTermDays,
        bytes calldata inputProof
    ) external {
        euint32 encryptedAmount = FHE.fromExternal(inputAmount, inputProof);
        euint32 encryptedRiskScore = FHE.fromExternal(inputRiskScore, inputProof);
        euint32 encryptedTermDays = FHE.fromExternal(inputTermDays, inputProof);

        // Private eligibility logic:
        // amount <= 5000
        // risk score >= 70
        // term days <= 90
        ebool amountOk = FHE.le(encryptedAmount, FHE.asEuint32(5000));
        ebool riskOk = FHE.ge(encryptedRiskScore, FHE.asEuint32(70));
        ebool termOk = FHE.le(encryptedTermDays, FHE.asEuint32(90));

        ebool isApproved = FHE.and(FHE.and(amountOk, riskOk), termOk);

        invoices[msg.sender].push(
            Invoice({
                encryptedAmount: encryptedAmount,
                encryptedRiskScore: encryptedRiskScore,
                encryptedTermDays: encryptedTermDays,
                approved: isApproved
            })
        );

        uint256 index = invoices[msg.sender].length - 1;

        FHE.allowThis(invoices[msg.sender][index].encryptedAmount);
        FHE.allowThis(invoices[msg.sender][index].encryptedRiskScore);
        FHE.allowThis(invoices[msg.sender][index].encryptedTermDays);
        FHE.allowThis(invoices[msg.sender][index].approved);

        FHE.allow(invoices[msg.sender][index].approved, msg.sender);
    }

    function getInvoiceApproval(address user, uint256 index) external view returns (ebool) {
        return invoices[user][index].approved;
    }

    function getInvoiceCount(address user) external view returns (uint256) {
        return invoices[user].length;
    }
}