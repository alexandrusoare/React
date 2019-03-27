import React from 'react';
import './style.css';

class Login extends React.Component{
    render(){
        return(<div>
          <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Calligraffitti" />
            <div id="loginCard">
          <h1 id="title">Kite</h1>
          <input className="inputFields" type="text" placeholder="Username" />
          <input
            className="inputFields"
            type="password"
            placeholder="Password"
          />
          <button onClick={this.props.swapForm} id="loginButton" type="button">
            Login
          </button>
        </div>
        </div>)
    }
}

export default Login;