const {Web3} = require("web3");
const dotenv = require("dotenv");
dotenv.config();

const web3 = new Web3("http://127.0.0.1:7545");
const contractABI = require("C:/Users/admin/Documents/VotingBackend/truffle/build/contracts/VotingSystem.json").abi;
const contractAddress = "0x428A0E3F65746e28e7d652074B130eAA282B1A45";

const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = { web3, contract };