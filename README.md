Just a repo to try out deploying simple smart contract utilising Truffle, with some notes for my own learning

- Using `Ganache-cli` for local RPC Server
- Using Infura for deployment to Goerli Testnet

## Prerequisites:

| Packages      | Version |
| ------------- | ------- |
| Node          | 18.13.0 |
| Solidity      | 0.5.16  |
| Truffle       | 5.8.2   |
| Ganache       | 7.7.7   |

## Quick start (local development):
### *Deploying smart contract*
1. Run `ganache-cli` on command line and leave running
2. In a new terminal tab, go into `/lottery-smart-contract` and run the following:
    - `npm i` 
    - `truffle migrate`: This automatically deploys both files in `/migration` folder 
    - After which in the previous terminal window, you should see a bunch of transactions, you can find the contract address here.

### *Setting up nodejs app*
3. Inside `/lottery-app`, create `.env` file with the following:
        PORT=
        DEV_CONTRACT_ADDRESS=
4. Run `npm i` and `npm run dev` to start making api calls against locally set up RPC server to your defined port (defaults to 3000 if empty)

## Quick start (goerli testnet):
### *Deploying smart contract*
1. Inside `/lottery-smart-contract`, create `.env` file and add the following:

        PRIVATE_KEY_1=get from ur own wallet
        SECRET_KEY=get from ur own wallet
        INFURA_GOERLI_RPC_URL=get from infura
1. Run `ganache-cli` on command line and leave running
2. In a new terminal tab, go into `/lottery-smart-contract` and run the following:
    - `npm i` 
    - `truffle migrate --network goerli`: This automatically deploys both files in `/migration` folder 
    - After which in the previous terminal window, you should see a bunch of transactions, you can find the contract address here.

### *Setting up nodejs app*
3. Inside `/lottery-app`, create `.env` file with the following:
        
        PORT=
        WALLET_2_ADDRESS=your wallet addr
        WALLET_2_PRIVATE_KEY=your wallet priKey
        INFURA_GOERLI_RPC_URL=
4. Run `npm i` and `npm run dev:goerli` to start making api calls to locally set up RPC server


---- 
## Troubleshooting
 **When you get `Out of Gas?` error in local development**

Unconfirmed Possible cause:
- Left Ganache idle for too long

Steps to fix
1. Kill current session of `ganache-cli`
2. Go to `/lottery-smart-contract` to run `truffle networks` and see if the previous session still exists
3. `truffle networks --clean` to remove old session
4. Rerun new session of `ganache-cli` 