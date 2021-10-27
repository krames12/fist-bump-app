import * as React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am Nick and I'm a maker and dice rolling gamer, that's pretty neat right? Connect your Ethereum wallet and send me a fist bump!
        </div>

        <button className="waveButton" onClick={wave}>
          Fist bump 👊
        </button>
      </div>
    </div>
  );
}
