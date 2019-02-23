import React from "react";
import Counter from './Counter';

const Player = (props) => (
  <div className="player">
    <span className="player-name">
      <button className="remove-player">✖</button>
      {props.name}
    </span>
    <Counter/>
  </div>
);

export default Player;
