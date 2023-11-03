"use client"

import { useEffect, useState } from 'react';
import Web3 from 'web3';

export default function Home() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(accounts => setAccount(accounts[0]))
          .catch(error => console.error(error));
      }
    }
  }, []);

  useEffect(() => {
    if (web3 && account) {
      web3.eth.getBalance(account)
        .then(result => setBalance(web3.utils.fromWei(result, 'ether')))
        .catch(error => console.error(error));
    }
  }, [web3, account]);

  return (
    <div>
      <h1>Simple Web3 Wallet</h1>
      <p>Account: {account}</p>
      <p>Balance: {balance} ETH</p>
      <button>Send ETH</button>
    </div>
  );
}
