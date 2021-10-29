import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/FistBumpPortal.json"
import FistBumpForm from "./components/FistBumpForm";
import RecentFistBumps from "./components/RecentFistBumps";

export default function App() {
  /* eslint-disable react-hooks/exhaustive-deps */
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalFistBumps, setTotalFistBumps] = useState(0);
  const [recentFistBumps, setRecentFistBumps] = useState([]);
  const { ethereum } = window;

  const checkIfWalledIsConnected = async () => {
    if(!ethereum) return;

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if(accounts.length !== 0) {
      const account = accounts[0];
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

  useEffect(() => {
    checkIfWalledIsConnected();
  });

  useEffect(() => {
    getTotalFistBumps();
    getAllFistBumps();
  }, [isLoading]);

  const connectWallet = async () => {
    try {

      if(!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

  const fistBump = async (message) => {
    try {
      if(ethereum) {
        const fistBumpPortalContract = createNewContract();

        const fistBumpTxn = await fistBumpPortalContract.fistBump(message, { gasLimit: 500000});
        setIsLoading(true);
        console.log("Mining...", fistBumpTxn.hash);

        await fistBumpTxn.wait();
        console.log("Mined -- ", fistBumpTxn.hash);
        setIsLoading(false);
      } else {
        console.log("Etherum object doesn't exist!");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  const getAllFistBumps = async () => {
    try {
      if(ethereum) {
        const fistBumpPortalContract = createNewContract();

        const fistBumps = await fistBumpPortalContract.getAllFistBumps();
        const cleanedFistBumps = cleanFistBumps(fistBumps);

        setRecentFistBumps(cleanedFistBumps.reverse())
      } else {
        console.log("Etherum object doesn't exist!");
      }
    } catch (error) {
      console.error(error)
    }
  }

  const cleanFistBumps = fistBumps => {
    return fistBumps.map( fistBump => ({
        address: fistBump.bumper,
        message: fistBump.message
      })
    )
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

        <FistBumpForm
          isLoading={isLoading}
          currentAccount={currentAccount}
          fistBumpHandler={fistBump}
          totalFistBumps={totalFistBumps}
          connectWalletHandler={connectWallet}
        />
      </div>
      <RecentFistBumps recentFistBumps={recentFistBumps} />
    </div>
  );
}
