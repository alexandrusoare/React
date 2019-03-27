import React from 'react';
import './style.css';
import icon from './searchIcon.png';

class Table extends React.Component{
    render(){
        if (this.props.isLoaded == false) {
            return (<center><div><h1>Data is loading... please wait</h1>
                <div class="spinner-border" role="status">
                 <span class="sr-only">Loading...</span>
                </div>            
            </div></center>)
          }
        return(<div id="tableContainer">
            <h2 id='location'>Locations</h2>
            <div id='containerSearch'>
            <img src={icon} id='lupa'></img>
            <input id='searchbar' onChange={this.props.updateSearch} type='text' placeholder="Search..."/>
            </div>
            <table className="table table-striped">
            <thead className='thead-light'>
                <tr>
                    {
                        this.props.campuri.map(x => {
                            
                            return(<th onClick={this.props.sortData} id={x.numeCamp} className='headtab'>{x.displayName}
                                <div className='arrow-up'></div>
                                <div className='arrow-down'></div>
                            </th>)
                        })
                    }
                </tr></thead>
                <tbody>
                    {
                        this.props.locatii.map(locatie =>{
                            if (
                                locatie.name.search(new RegExp(this.props.searchWord, "i")) !=
                                  0 &&
                                locatie.country.search(new RegExp(this.props.searchWord, "i")) !=
                                  0
                              ) {
                                return null;
                              }
                            return(
                                <tr>
                {this.props.campuri.map(camp => {
                  return (
                    <td>
                      {locatie[camp.numeCamp]}
                    </td>
                  );
                })}
                        </tr>)})}
                       </tbody> 
            </table>
        </div>)
    }
}

export default Table;