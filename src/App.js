import * as React from "react";
// import { ethers } from "ethers";
import './App.css';

export default function App() {

  const fistBump = () => {

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
          Fist bump <span role="img" aria-label="fisted hand sign emoji">👊</span>
        </button>
      </div>
      <div className="recentBumpsContainer">
        <h2>Recent Fist Bumps</h2>
        <p>No fist bumps yet, but you could be the first!</p>
      </div>
    </div>
  );
}
