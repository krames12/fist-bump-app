import React from "react";

const RecentFistBumps = ({recentFistBumps}) => (
  <div className="recentBumpsContainer">
    <h2>Recent Fist Bumps</h2>
    {recentFistBumps.length ? (
      <ul className="recentFistBumpsList">
        {recentFistBumps.map( txn => (
          <li className="recentFistBump" key={`bump-${Math.random()}`}>{txn.address} - {txn.message}</li>
        ))}
      </ul>
    ) : (
      <p>No fist bumps yet, but you could be the first!</p>
    )}
  </div>
);

export default RecentFistBumps;