require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const SMART_CONTRACT_ABI = require('../lottery-smart-contract/build/contracts/Lottery.json')

const goerliProvider = new Web3(
    new HDWalletProvider(
        process.env.WALLET_2_PRIVATE_KEY,
        process.env.INFURA_GOERLI_RPC_URL
    )
);
const developmentProvider = new Web3("http://127.0.0.1:8545");

module.exports = {
    goerliContract: new goerliProvider.eth.Contract(SMART_CONTRACT_ABI.abi, '0x4094F2b62E227D9CE8F86F6933886683D347c098'),
    goerliProvider,
    devContract: new developmentProvider.eth.Contract(SMART_CONTRACT_ABI.abi, process.env.DEV_CONTRACT_ADDRESS),
    devProvider: developmentProvider
}