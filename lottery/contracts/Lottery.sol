// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// import "truffle/Console.sol";

contract Lottery {
    address public owner;
    address payable[] public players;
    uint public lotteryId;

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

    function enter() public payable {
        require(msg.value >= 0.001 ether);
        players.push(payable(msg.sender));
        // Console.log('Entered to lotteryId=${lotteryId}:', msg.sender);
    }

    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    function pickWinner() public onlyOwner {
        uint winningIdx = getRandomNumber() % players.length;
        address payable winner = players[winningIdx];
        // Console.log('Picked winner for lotteryId=${lotteryId}:', winner);
        // Console.log('Transferring price pot balance:', address(this).balance);
        // transfer entire contract bal to winner
        winner.transfer(address(this).balance);
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