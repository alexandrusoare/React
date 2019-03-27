import React from 'react';
import './style.css';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
import favoriteMarker from './favoriteMarker.png';
import redMarker from './newMarker.png';

const mapStyles = {
    width: '100%',
    height: '500px',
  };

const styleforP={
    fontWeight:'bold'
    ,color:'grey'
}  

export class MapContainer extends React.Component{
    constructor(props){
      super(props);

      this.state = {
        showingInfoWindow: false,  
        activeMarker: {},          
        selectedPlace: {},
        filterButton: true,
        markers : this.props.locatii,
        filtercountry: '',
        filterwind:''
      };

      this.changeFavoriteStatus = this.changeFavoriteStatus.bind(this);
    }
    

      changeFavoriteStatus = (id) =>{
          console.log(id);
          this.setState({
            markers: this.state.markers.map(x =>{
               if(x.id == id) 
              x.isFavorite = !x.isFavorite
              })
            })}
                
                

      handleChangecountry=(event) => {
       this.setState({
          filtercountry : event.target.value
        });
        console.log(event.target.value);
        if (event.target.value === '' && this.state.filterwind === ''){
          console.log('filtrat');
          this.setState({
            markers: this.props.locatii
          })
        }
      }

      handleChangewind = (event) =>{
        this.setState({
          filterwind : event.target.value
        })
      }

      applyFilter = () =>{
          this.setState({
              markers : this.state.markers.filter(marker =>
                {
            if(marker.country == this.state.filtercountry && marker.windProbability == this.state.filterwind) {return true}           
            
        }),
          filterButton: true
      })}

      

     onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
  
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

    showFilter = ()=>{
      this.setState({
        filterButton: !this.state.filterButton
      })
    }

    render(){
        if(this.props.isLoaded == false){
            return(
                <center><div style={mapStyles}><h1>Data is loading... please wait</h1>
                <div class="spinner-border" role="status">
                 <span class="sr-only">Loading...</span>
                </div>            
            </div></center>)
            
        }
        return(<div style={mapStyles}>
        {(this.state.filterButton == true)
        ?<button onClick={this.showFilter} id='filterbutton'>
        <img id='filterimg' src="https://img.icons8.com/material/24/000000/filter.png"></img>
        Filters</button>
        :<div id='filteroptions'>
        <div style={{margin:'10px'}}>
        <p>
        <span className='formspan'>Country</span>
        <input onChange={this.handleChangecountry} className='forminputfil' type='text'/>
        </p>
        <p>
        <span  className='formspan'>Wind Probability</span>
        <input className='forminputfil' onChange={this.handleChangewind} type='text'/>
        </p>
        </div>
        <button onClick={this.applyFilter} id='applyfil'>Apply Filter</button>
        </div>
      }
        <Map
            google={this.props.google}
         zoom={5} 
        style={mapStyles} disableDefaultUI='true'
        initialCenter={{
         lat: this.props.locatii[0].latitude,
         lng: this.props.locatii[0].longitude 
        }} ><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        {   
            this.state.markers.map((x) => {
              if(x.isFavorite == true){
                return(
                  <Marker id={x.id}  options={{icon: favoriteMarker}} isFavorite={x.isFavorite}
                   onClick={this.onMarkerClick} when={x.whenToGo} wind={x.windProbability}
                    lat={x.latitude} lng={x.longitude} name={x.name} country={x.country}
                     Position={{lat: x.latitude,lng: x.longitude}}></Marker>
                )
              }
                return(
                <Marker id={x.id} favorite={x.isFavorite} options={{icon: redMarker}} onClick={this.onMarkerClick} when={x.whenToGo} wind={x.windProbability} lat={x.latitude} lng={x.longitude} name={x.name} country={x.country} Position={{lat: x.latitude,lng: x.longitude}}></Marker>)
            })}
        
        
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          
        > 
          <div id='iwc' style={{'width':'150px','height':'300px','margin':'0'}}>
             <h5 style={{'font-weight':'bold','marginBottom':'3px'}}>
            {this.state.selectedPlace.name}
            {(this.state.selectedPlace.isFavorite == true)
          ?<span style={{'margin-left':'5px'}} class="fa fa-star checked"></span>
          :<span/>}
            </h5>
            <p style={styleforP}>{this.state.selectedPlace.country}</p>
             <div>
              <p ><span style={styleforP}>WIND PROBABILITY</span><br/>
              {this.state.selectedPlace.wind+'%'}
              </p>
              <p ><span style={styleforP}>LATITUDE</span><br/>
              {this.state.selectedPlace.lat+' N'}
              </p>
              <p ><span style={styleforP}>LONGITUDE</span><br/>
              {this.state.selectedPlace.lng+' W'}
              </p>
              <p ><span style={styleforP}>WHEN TO GO</span><br/>
              {this.state.selectedPlace.when}
              </p>
             </div>
             {(this.state.selectedPlace.favorite ==false) 
             ?<button onClick={()=>this.sayhello} id='favoritesButton'>+ADD TO FAVORITES</button>
             :<button onClick={()=>this.changeFavoriteStatus(this.state.selectedPlace.id)} id='regularButton'>- REMOVE FROM FAVORITES</button>}
          </div>
        </InfoWindow>
        </Map></div>)
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyA5GZ58VZLJL-9bJ-zflLDWWs4zVi8ymr0'
  })(MapContainer);

