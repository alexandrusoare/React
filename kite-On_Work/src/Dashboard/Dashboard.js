import React from 'react';
import './style.css';
import Header from './Header';
import Table from './Table';
import MapContainer from './Map';

class Dashboard extends React.Component{
    render(){
        return(
            <div>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
                <Header addButtonactive={this.props.addButtonactive} changeAddStatus={this.props.changeAddStatus} swapForm={this.props.swapForm} />
                <div style={{'width': '100%','height':'500px','position':'relative'}}>
                <MapContainer  isLoaded={this.props.isLoaded} locatii={this.props.locatii} />
                </div>
                <Table searchWord={this.props.searchWord} updateSearch={this.props.updateSearch} sortData={this.props.sortData}
                 campuri={this.props.campuri} locatii={this.props.locatii} isLoaded={this.props.isLoaded} />
            </div>
        )
    }
}

export default Dashboard;