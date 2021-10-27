import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const { ethereum } = window;

  const checkIfWalledIsConnected = async () => {
    if(!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object!", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if(accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found")
    }
  }

  useEffect(() => {
    checkIfWalledIsConnected();
  }, []);

  const connectWallet = async () => {
    try {

      if(!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        <span role="img" aria-label="waving hand sign emoji">👋</span> Hey there!
        </div>

        <div className="bio">
        I am Nick and I'm a maker and dice rolling gamer, that's pretty neat right? Connect your Ethereum wallet and send me a fist bump!
        </div>

        <button className="fistBumpButton" onClick={null}>
          Fist bump <span role="img" aria-label="fisted hand sign emoji">👊</span>
        </button>

        {!currentAccount && (
          <button className="fistBumpButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
      <div className="recentBumpsContainer">
        <h2>Recent Fist Bumps</h2>
        <p>No fist bumps yet, but you could be the first!</p>
      </div>
    </div>
  );
}
