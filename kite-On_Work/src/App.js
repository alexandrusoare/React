import React, { Component } from 'react';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {
      login: true,
      token: '',
      isLoaded: false,
      addButtonactive: false,
      locatii: [],
      campuri:[{
        displayName: 'Name',
        numeCamp: 'name'
      },{
        displayName: 'Country',
        numeCamp: 'country'
      },
      {
        displayName: 'Latitude',
        numeCamp: 'latitude'
      },{
        displayName: 'Longitude',
        numeCamp: 'longitude'
      },{
        displayName: 'Wind Prob.',
        numeCamp: 'windProbability'
      },{
        displayName: 'When to go',
        numeCamp: 'whenToGo'
      }],
      sortData: {
        directieSortare: 0,
        id_coloana: null
      }
    };
  }

  componentDidMount(){
      const data={
        "email" : "t1@gmail.com"}

        fetch('https://internship-2019.herokuapp.com/api-user-get',
        {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body:  JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data =>{ 
          this.setState({
          token : data.result.token})

          fetch('https://internship-2019.herokuapp.com/api-spot-get-all',
        {
          method: 'POST',
          headers:{
            'Content-Type' : 'application/json',
            'token' : data.result.token
          }
          ,body: JSON.stringify({
            "country": "",
            "windProbability": ""
          })
        }).then(res => res.json())
          .then(data => this.setState({
            locatii: data.result
          }))
        })
        };

        componentDidUpdate(){
          this.state.locatii.map( (a,index) => {
              fetch('https://internship-2019.herokuapp.com/api-spot-get-details',{
                method: 'POST',
          headers:{
            'Content-Type' : 'application/json',
            'token' : this.state.token
          }
          ,body: JSON.stringify({
            "spotId": a.id
          })
              }).then(res => res.json())
                .then(data => {
                    a.longitude = data.result.longitude;
                    a.latitude = data.result.latitude;
                    a.windProbability = data.result.windProbability;
                    if (index == this.state.locatii.length -1){
                      this.setState({
                        isLoaded: true
                      })
                    }
                } )
          }) 
          
        }

        updateSearch = event => {
          this.setState({
            searchWord: event.target.value
          });
        };

        sortData = event => {
          var directieSortare;
          if (this.state.sortData.id_coloana == event.target.id) {
            directieSortare = this.state.sortData.directieSortare * -1;
          } else {
            directieSortare = 1;
          }
      
          this.setState({
            sortData: {
              id_coloana: event.target.id,
              directieSortare: directieSortare
            }
          });
          
          this.setState({
            locatii: this.state.locatii.sort((a, b) => {
              if (event.target.id == 'whenToGo'){
                var months = ["january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"];
            var x = a[event.target.id];
            var y = b[event.target.id];
                if(directieSortare == 1){
            return months.indexOf(x.toLowerCase())
            - months.indexOf(y.toLowerCase());}
                else if(directieSortare == -1){
                  return months.indexOf(y.toLowerCase())
            - months.indexOf(x.toLowerCase());
                }
              }else{
              var x = a[event.target.id];
              var y = b[event.target.id];
              if (x > y) {
                return directieSortare;
              } else if (x < y) {
                return directieSortare * -1;
              }
              return 0;}
            })
          });
        };

      changeAddStatus= () =>{
        this.setState({
          addButtonactive : !this.state.addButtonactive
        })
      }  

      swapForm = () => {
    this.setState({
      login: !this.state.login
    });
  };

      
      

    render(){
      if (this.state.login === true) {
        return (
          <div>
            <Login swapForm={this.swapForm} />
          </div>
        );
    }else if(this.state.login !== true){
      return (
        <div>
          <Dashboard addButtonactive={this.state.addButtonactive} changeAddStatus={this.changeAddStatus} changeFavoriteStatus={this.changeFavoriteStatus} searchWord={this.state.searchWord} updateSearch={this.updateSearch} sortData={this.sortData}
           isLoaded={this.state.isLoaded} campuri={this.state.campuri} locatii={this.state.locatii} swapForm={this.swapForm} />
        </div>
      );
    }
}
}

export default App;
