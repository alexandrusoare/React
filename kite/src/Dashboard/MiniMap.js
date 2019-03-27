import React from 'react';
import { Map, GoogleApiWrapper} from 'google-maps-react';

const mapStyles={
    width: '230px' ,
    height: '140px',
    position: 'relative'
}




export class MiniMapContainer extends React.Component{
    constructor(){
        super();
       this.state={

        }
    }
    render(){
        return(<div style={mapStyles}>
        <Map
            google={this.props.google}
        zoom={5} disableDefaultUI='true'
        style={mapStyles}
        initialCenter={{
          lat: 40.854885,
          lng: -88.081807 
  }} ></Map></div>
        )
    }

}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA5GZ58VZLJL-9bJ-zflLDWWs4zVi8ymr0'
  })(MiniMapContainer)