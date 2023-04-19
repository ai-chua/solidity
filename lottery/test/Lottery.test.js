const Lottery = artifacts.require("Lottery");

contract("Lottery", (accounts) => {
    before(async () => {
        instance = await Lottery.deployed();
    })

    it("ensures that lotteryId is 1", async () => {
        const lotteryId = await instance.getCurrentLotteryId();
        assert.equal(lotteryId, 1, 'The lotteryId is 1');
    })

    it("ensures that players can enter lottery", async () => {
        // enter account[2] and [3] to lottery
        await instance.enter({
            from: accounts[2],
            value: web3.utils.toWei('1', 'ether')
        }) 
        await instance.enter({
            from: accounts[3],
            value: web3.utils.toWei('1', 'ether')
        }) 

        const players = await instance.getPlayers();
        assert.equal(
            players,
            [
                accounts[2],
                accounts[3]
            ],
            "The players are account 2 and 3"
            )
    })
})