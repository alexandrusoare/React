import React from "react";

const Header = props => (
  <header>
    <h1>{props.titlu}</h1>
    <span className={props.titlu}> Players: {props.lungime}</span>
  </header>
);

export default Header;
