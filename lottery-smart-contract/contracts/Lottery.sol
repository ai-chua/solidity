// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Lottery {
    address public owner;
    event PotIncreased(uint lotteryId, address player, uint amount);
    address payable[] public players;
    uint public lotteryId;
    event PickedWinner(uint lotteryId, address player, uint amount);
    mapping (uint=>address) pastResult;

    constructor() {
        // set the owner from the initial deployed msg
        owner = msg.sender;
        lotteryId = 1;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function getCurrentLotteryId() public view returns (uint) {
        return lotteryId;
    }

    function getPastResult(uint draw) public view returns (address) {
        require(draw < lotteryId, 'Please provide a lotteryId smaller than the current');
        return pastResult[draw];
    }

    function enter() public payable {
        require(msg.value >= 0.001 ether);
        players.push(payable(msg.sender));
        emit PotIncreased(lotteryId, msg.sender, msg.value);
    }

    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() public onlyOwner {
        uint winningIdx = getRandomNumber() % players.length;
        address payable winner = players[winningIdx];
        emit PickedWinner(lotteryId, winner, address(this).balance);
        // Console.log('Picked winner for lotteryId=${lotteryId}:', winner);
        // Console.log('Transferring price pot balance:', address(this).balance);
        // transfer entire contract bal to winner
        winner.transfer(address(this).balance);
        // set past winner
        pastResult[lotteryId] = winner;
        // increment lotteryId
        lotteryId++;
        // reset players in current contract
        players = new address payable[](0);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can make this call");
        _;
    }

}