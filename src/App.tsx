import React from 'react';
import logo from './logo.svg';
import './App.css';
  import {
  Ed25519Keypair,
  JsonRpcProvider,
  RawSigner,
  LocalTxnDataSerializer,
} from '@mysten/sui.js';

import {ConnectButton, useWallet, getDefaultWallets, WalletProvider, useAccountBalance} from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";


function App() {
  const {
    wallet,
    address,
    executeMoveCall,
  } = useWallet();
  const {balance} = useAccountBalance();


  async function handleExecuteMoveCall() {
    try {
      const data = {
        packageObjectId: "0x2",
        module: "sui",
        function: "transfer",
        typeArguments: [],
        arguments: [
          "0x02fdb5b7b87832e23e46570aaab79e19b1015f6e",
          "0x94d325aa16ac68be50726249c0aa16b24a33facd",
        ],
        gasBudget: 10000,
      }
      const resData = await executeMoveCall(data);
      console.log('executeMoveCall success', resData)
      alert('executeMoveCall succeeded (see response in the console)')
    } catch (e) {
      console.error('executeMoveCall failed', e)
      alert('executeMoveCall failed (see response in the console)')
    }
  }


  return (
    <div className="App">
      <header className="App-header">

        <div className={'connect-button'}>
          <ConnectButton style={{width: '100px'}}/>
        </div>
        <p>current wallet: {wallet ? wallet.adapter.name : "null"}</p>
        <p>current balance: {balance ? balance : "null"}</p>
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{margin: "8px 0"}}>
          <button onClick={handleExecuteMoveCall}>executeMoveCall</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>

    </div>
  );
}

export default function withApp() {
  return (
    <WalletProvider supportedWallets={getDefaultWallets()}>
      <App/>
    </WalletProvider>
  )
};

