const Lottery = artifacts.require("Lottery");

// For simplicity, tests are sequential but this is bad practice
contract("Lottery", (accounts) => {
    before(async () => {
        instance = await Lottery.deployed();
    })

    it("should return that lotteryId is 1 right after contract deployment", async () => {
        const lotteryId = await instance.getCurrentLotteryId();
        console.log('lotteryId 🤡', lotteryId.toString());
        assert.equal(lotteryId, 1, 'The lotteryId is 1');
    })

    it("should enable players to enter lottery", async () => {
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
            players[0],
            accounts[2],
            "The player 2 was registered successfully"
        )
        assert.equal(
            players[1],
            accounts[3],
            "The player 3 was registered successfully"
        )
    })

    it("should get balance of current pot", async () => {
        const totalPot = await instance.getBalance();
        console.log('totalPot in ether 🤡', web3.utils.fromWei(totalPot, 'ether'));
        assert.equal(totalPot, web3.utils.toWei('2', 'ether'), `Total pot is returned correctly`);
    })
})