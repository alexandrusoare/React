import React from 'react';
import './style.css';
import avatar from './avatar.png';
import MiniMap from './MiniMap';

class Header extends React.Component{
        constructor(){
            super();
            this.state={
                signOutButton : false
            }
        }

        showButton = () =>{
            this.setState({
                signOutButton: true
            })
        }

    render(){
        return(
            <nav className="navbarr">
			<span id="logo">Kite</span>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Calligraffitti" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"></link>
			{(this.props.addButtonactive == false)
            ?<ul class="elementlistt">
				<li><button type="button" onClick={this.props.changeAddStatus} id="addSpotButton">ADD SPOT</button></li>	
            </ul> 
            : <div id='addSpotContainer'>
                <h4>Add Spot</h4>
                <div className='inputcontainer'><p>
                    <span className='formspan'>Name</span><br/>
                    <input className='forminput' type='text'/>
                </p>
                <p>
                    <span className='formspan'>Country</span><br/>
                    <input className='forminput' type='text'/>
                </p>
                <p>
                <p>
                    <span className='formspan'>High Season</span><br/>
                    <input className='forminput' type='month'/>
                </p>
                </p>
                </div>

                <MiniMap />
                <div className='btncont'><button id='CancelButton' onClick={this.props.changeAddStatus} >Cancel</button>
                <button id='ConfirmButton'>Confirm</button></div>
                </div>}
            
                <img id='avatar' onClick={this.showButton} src={avatar}/>
                {(this.state.signOutButton == true)
                ?<button id='sign-out' onClick={this.props.swapForm} type="button" >
                <span class="glyphicon glyphicon-log-out"></span> Logout
              </button>
                :''}
        </nav>)}
    }


export default Header;