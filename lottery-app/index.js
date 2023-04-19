require('dotenv').config();
const express = require('express');
const { goerli, dev } = require('./lottery-contract')

const PORT = process.env.PORT || 3000;
const contract = process.env.NODE_ENV === 'development' ? dev : goerli;
console.log('contract', contract)
const app = express();
app.use(express.json());
app.get(
    '/lottery-id',
    async (req, res) => {
        const lotteryId = await contract.methods.getCurrentLotteryId().call();
        console.log('lotteryId', lotteryId)
        return res.status(200).send({ data: { lotteryId } }).end()
    }
)

app.get(
    '/players',
    async (req, res) => {
        const players = await contract.methods.getPlayers().call();
        console.log('players', players)
        return res.status(200).json({ data: { players } })
    }
)

app.listen(PORT, () => {
    console.log(`NODE_ENV`, process.env.NODE_ENV);
    console.log(`lottery_app listening on port ${PORT}`);
  }
)