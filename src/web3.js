import Web3 from '../node_modules/web3';
//rinkeby-

const HDWalletProvider = require('../node_modules/truffle-hdwallet-provider');
var mnemonic = "repeat cargo weapon age wrestle chaos keep panic gallery wrestle alert elephant";
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/7848e86fefda49de8a0dfc59bbea7e11",
);
const web3 = new Web3(provider);

/*
//using ganache:-
var web3 = window.web3
var provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
web3 = new Web3(provider)
*/
export default web3;