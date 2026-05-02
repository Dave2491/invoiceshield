"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
async function main() {
    const Contract = await hardhat_1.ethers.getContractFactory("InvoiceShield");
    const contract = await Contract.deploy();
    await contract.waitForDeployment();
    console.log("InvoiceShield deployed to:", await contract.getAddress());
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
