import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import ShowDetails from './ShowDetails'

class App extends Component {
  constructor(props) {
    super(props);
    console.log(web3.version);

    let contractABI = window.web3.eth.contract([{"constant":false,"inputs":[{"name":"_vaccineID","type":"uint256"},{"name":"_temperature","type":"int256"},{"name":"_long","type":"int256"},{"name":"_lat","type":"int256"}],"name":"addDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_vaccineID","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"temperature","type":"int256"},{"indexed":false,"name":"long","type":"int256"},{"indexed":false,"name":"lat","type":"int256"}],"name":"NewDetails","type":"event"}]);

    this.state =  {
      contractInstance : contractABI.at('0x8e824e179bddc6d31a519194255b1a0918068850'),
      details: [],
      okayToShow: false
    }
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick() {
    const {NewDetails} = this.state.contractInstance;
    let temp = [];

    NewDetails({}, { fromBlock: 2750778, toBlock: 2750820 })
			.get((error, eventResult) => {
        console.log(JSON.stringify(eventResult[0].args));
          for(let i=0; i<eventResult.length; i++) {
            let k = [eventResult[i].args._vaccineID.toNumber(), eventResult[i].args.timestamp.toNumber(),eventResult[i].args.temperature.toNumber(),eventResult[i].args.long.toNumber(),eventResult[i].args.lat.toNumber()];
            console.log(k);
            temp.push(k);
            this.setState({ details: temp });

            if(i===eventResult.length-1) { 
              //only after all events been read, allow for tables to be seen!
              this.setState({ okayToShow: true }); 
            }
          }
      })
  }

  render() {
    this.handleClick;
    return (
      <div className="App">
        <p className="App-intro">
        </p>
        <button id="get-vaccines" onClick={this.handleClick}>Get Vaccine Details</button>
        {this.state.okayToShow ? <ShowDetails det={this.state.details} /> : <p></p> }
      </div>
    );
  }

}

export default App;



  /*
  async handleSubmit(e) {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    let vacId = document.querySelector('input[name=vaccine]').value;
    let childId = document.querySelector('input[name=child]').value;

    await this.state.myContract.methods.gaveAVaccine(childId, vacId).send({gas: 6721974, from: accounts[0]}, (err,txHash) => {
      console.log(txHash);
      web3.eth.getTransactionReceipt(txHash, (err,res) => {
        console.log(res)
      })
    });
/*
    var gaveAVaccine = await this.state.myContract.methods.gaveAVaccine(childId, vacId);
    var encodedABI = gaveAVaccine.encodeABI();
    
    var tx = {
      from: '0xabea5cc681cef2fd521ab10191dced46d5be8bc6',//this.state.address,
      to: this.state.contractAddress,
      gas: 2000000,
      data: encodedABI
    }; 

    await web3.eth.getBalance('0xabea5cc681cef2fd521ab10191dced46d5be8bc6', (err,res) => {
      console.log(err,res)
    })

    await web3.eth.accounts.signTransaction(tx, '51849d2e8a9cd6a3adbdba4f99e6f0af3284b95f7b7c88d0fb8cc5550e9c3350').then(signed => {
      web3.eth.sendSignedTransaction(signed.rawTransaction, (err,res) => {
        console.log(err,res);
      })
    })
    */
  //}
