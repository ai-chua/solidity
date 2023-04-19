require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

const private_keys = [
  process.env.PRIVATE_KEY_1,
  process.env.PRIVATE_KEY_2,
]

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    goerli: {
      provider: () => new HDWalletProvider(
        {
          privateKeys: private_keys,
          providerOrUrl: 'https://goerli.infura.io/v3/9152d493a2b4451a9d05b2d5c04bc748',
          numberOfAddress: 2
        },
      ),
      network_id: 5,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
