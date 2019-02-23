import React, {Component} from "react";


class Counter extends Component{
    state={
        score: 0
    }
    render(){
        return(
  <div class="counter">
    <button class="counter-action decrement">-</button>
    <span class="counter-score">{this.state.score}</span>
    <button class="counter-action increment">+</button>
  </div>)
};}

export default Counter;
