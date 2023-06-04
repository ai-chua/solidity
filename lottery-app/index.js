require('dotenv').config();
const express = require('express');
const { goerliContract, devContract, devProvider } = require('./lottery-contract');
const web3 = require('web3');

const PORT = process.env.PORT || 3000;
const provider = process.env.NODE_ENV === 'development' ? devProvider : goerliProvider;
const contract = process.env.NODE_ENV === 'development' ? devContract : goerliContract;

const app = express();
app.use(express.json());
app.get(
    '/lottery-id',
    async (req, res) => {
        const lotteryId = await contract.methods.getCurrentLotteryId().call();
        const balance = await contract.methods.getBalance().call();
        console.log('lotteryId', lotteryId)

        return res.status(200).send({ data: {
            lottery_id: lotteryId, 
            total_pot: web3.utils.fromWei(balance, 'ether')
        }}).end()
    }
)

app.get(
    '/players',
    async (req, res) => {
        const players = await contract.methods.getPlayers().call();
        console.log('players', players)

        return res.status(200).send({ data: { players } })
    }
)

app.get(
    '/winner',
    async (req, res) => {
        const { draw_id } = req.query;
        const winner = await contract.methods.getPastResult(draw_id).call();
        return res.status(200).send({ data: { draw_id, winner } })
    }
)

app.post(
    '/enter',
    async (req, res) => {
        try {
            const { from, value } = req.body;
            const chainId = await provider.eth.net.getId();
            console.log('chainId', chainId)
            const amt = web3.utils.toWei(value.toString(), 'ether');
            const tx = await contract.methods.enter().send({
                from,
                value: amt
            });
            console.log('tx', tx);
            return res.status(201).send({data: { tx}})
        } catch (error) {
            console.log('error', error)
            return res.status(500).send({error: { message: 'Failed to enter'}})
        }
    }
)

app.post(
    '/draw',
    async (req, res) => {
        try {

        } catch (error) {
            console.log('error', error)
            return res.status(500).send({error: { message: 'Failed to pick winner'}})
        }
    }
)

app.listen(PORT, () => {
    console.log(`NODE_ENV`, process.env.NODE_ENV);
    console.log(`lottery_app listening on port ${PORT}`);
  }
)