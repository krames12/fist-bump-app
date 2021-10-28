import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/FistBumpPortal.json";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalFistBumps, setTotalFistBumps] = useState(0);
  const [recentFistBumps, setRecentFistBumps] = useState([]);
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

  const createNewContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      abi.abi,
      signer);
  }

  useEffect(() => {
    checkIfWalledIsConnected();
  });

  useEffect(() => {
    getTotalFistBumps();
    getRecentTxns();
  }, [setIsLoading]);

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

  const getTotalFistBumps = async () => {
    try {
      if(ethereum) {
        const fistBumpPortalContract = createNewContract();

        let bumpCount = await fistBumpPortalContract.getTotalFistBumps();
        setTotalFistBumps(bumpCount.toNumber());
      } else {
        console.log("Etherum object doesn't exist!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fistBump = async () => {
    try {
      if(ethereum) {
        const fistBumpPortalContract = createNewContract();

        const fistBumpTxn = await fistBumpPortalContract.fistBump();
        setIsLoading(true);
        console.log("Mining...", fistBumpTxn.hash);

        await fistBumpTxn.wait();
        console.log("Mined -- ", fistBumpTxn.hash);
        setIsLoading(false);
      } else {
        console.log("Etherum object doesn't exist!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getRecentTxns = async () => {
    const response = await fetch(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${process.env.REACT_APP_CONTRACT_ADDRESS}&startblock=0&endblock=99999999&sort=desc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`)
      .then( response => response.json())
      .catch( error => console.error(error));

    console.log(response.result)
    setRecentFistBumps(response.result);
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

        <button className="fistBumpButton" onClick={fistBump}>
          {isLoading ? 
            `Sending...` : 
            (<span>Fist bump <span role="img" aria-label="fisted hand sign emoji">👊</span></span>)
          }
        </button>

        <p className="totalFistBumpOutput">Total Fist Bumps: {totalFistBumps}</p>

        {!currentAccount && (
          <button className="fistBumpButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
      <div className="recentBumpsContainer">
        <h2>Recent Fist Bumps</h2>
        {recentFistBumps.length ? (
          <ul className="recentFistBumpsList">
            {recentFistBumps.map( txn => (
              <li className="recentFistBump" key={txn.timeStamp}>{txn.from} - {txn.timeStamp}</li>
            ))}
          </ul>
        ) : (
          <p>No fist bumps yet, but you could be the first!</p>
        )}
      </div>
    </div>
  );
}
