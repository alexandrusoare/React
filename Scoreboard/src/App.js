import React, { Component } from "react";

import "./App.css";
import "./Header";
import Header from "./Header";
import Player from "./Player";

class App extends Component {
  state = {
    players: [
      { id: 0, name: "Luca" },
      { id: 1, name: "Alex" },
      { id: 2, name: "Razvan" },
      { id: 3, name: "Stefan" }
    ]
  };

  render() {
    return (
      <div className="scoreboard">
        <Header titlu="Scoreboard" lungime = {this.state.players.length} />
        {
          this.state.players.map(player=>(
         <Player name={player.name} id={player.id} />
        ))
          }
      </div>
    );
  }
}

export default Grupa;
