import React, { useState } from "react";

const FistBumpForm = ({
  isLoading,
  currentAccount,
  fistBumpHandler,
  totalFistBumps,
  connectWalletHandler
}) => {
  const [message, setMessage] = useState("");

  return (
    <>
      <input
        value={message}
        onChange={event => setMessage(event.target.value)}
      />
      <button className="fistBumpButton" onClick={() => fistBumpHandler(message)}>
        {isLoading ? 
          `Sending...` : 
          (<span>Fist bump <span role="img" aria-label="fisted hand sign emoji">👊</span></span>)
        }
      </button>

      <p className="totalFistBumpOutput">Total Fist Bumps: {totalFistBumps}</p>

      {!currentAccount && (
        <button className="fistBumpButton" onClick={connectWalletHandler}>
          Connect Wallet
        </button>
      )}
    </>
  )
}

export default FistBumpForm;