import React, { Component } from 'react';
import './App.css';

class Student extends React.Component{
  constructor(props){
    super(props)}
    render(){
      return(
        <tr>
          <th>{this.props.nume}</th>
          <th>{this.props.prenume}</th>
          <th>{this.props.varsta}</th>
          <th>{this.props.medie}</th>
          <button onClick={this.stergeStudent} style={{'margin-left':'38%'}} type="button" class="btn btn-danger">Sterge</button>
        </tr>
      )
    }
  }


class Grupa extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      studenti:[
        {
          'nume': 'Soare',
          'prenume': 'Alexandru',
          'varsta': 20,
          'medie': 9.3
        },{
          'nume': 'Razvan',
          'prenume': 'Ionut',
          'varsta': 18,
          'medie': 9.0
        },
        {'nume': 'Margasoiu',
        'prenume': 'Luca',
        'varsta': 19,
        'medie': 8.7},
        {'nume': 'Haha',
        'prenume': 'Stefan',
        'varsta': 17,
        'medie': 9.20
      }]
    }
    this.adaugaStudent = this.adaugaStudent.bind(this);
    this.updateNume = this.updateNume.bind(this);
    this.updatePrenume = this.updatePrenume.bind(this);
    this.updateVarsta = this.updateVarsta.bind(this);
    this.updateMedie = this.updateMedie.bind(this);
    this.sortDupaNume = this.sortDupaNume.bind(this);
    this.sortDupaPrenume = this.sortDupaPrenume.bind(this);
    this.sortDupaVarsta = this.sortDupaVarsta.bind(this);
    this.sortDupaMedie = this.sortDupaMedie.bind(this);
    this.stergeStudent = this.stergeStudent.bind(this);
  }

  stergeStudent(e){
    this.setState({studenti: this.state.studenti.filter((x)=> x !== e.target.value )});
    }
  
  

  updateNume(e) {
    this.setState({
      "new_nume": e.target.value
    })
  }

  updatePrenume(e) {
    this.setState({
      "new_prenume": e.target.value
    })
  }

  updateVarsta(e) {
    this.setState({
      "new_varsta": e.target.value
    })
  }

  updateMedie(e) {
    this.setState({
      "new_medie": e.target.value
    })
  }

  adaugaStudent(){
      var nume = document.getElementById('nume');
      var prenume = document.getElementById('prenume');
      var varsta = document.getElementById('varsta');
      var medie = document.getElementById('medie')

     if (nume.value == null || prenume.value == null || varsta.value == null || medie.value == null){
      alert("Unul sau mai multe campuri nu au fost completate!");
      return;}
      else if (typeof(nume.value) !== 'string' || typeof(prenume.value) !== 'string' || typeof(parseInt(varsta.value)) !== 'number' || typeof(parseFloat(medie.value)) !== 'number'){
          alert("Unul sau mai multe campuri nu corespund tipului de date cerut");
          return;  
      }
     else if (this.state.studenti.length > 8){
         alert("Numarul maxim de studenti este 9.");
         return;
      }
      else{
    this.setState({
      "studenti": [...this.state.studenti, {'nume': this.state.new_nume, 'prenume': this.state.new_prenume,
      'varsta':this.state.new_varsta,'medie':this.state.new_medie}]
    })
    nume.value='';
    prenume.value='';
    varsta.value='';
    medie.value='';}
  }

  //sorteaza dupa nume
  sortDupaNume(ev){
      if (ev.target.classList.contains('active') != true){
        this.setState({
          studenti: this.state.studenti.sort((a,b) =>{
            var nameA = a.nume.toUpperCase(); 
            var nameB = b.nume.toUpperCase();

            if (nameA < nameB) 
              return -1;
            
            if (nameA > nameB)
              return 1;
            
            return 0;
          })
        })
        ev.target.classList.add('active');
      }else{
        this.setState({
          studenti: this.state.studenti.sort((a,b) =>{
            var nameA = a.nume.toUpperCase(); 
            var nameB = b.nume.toUpperCase();

            if (nameA > nameB) 
              return -1;
            
            if (nameA < nameB)
              return 1;
            
            return 0;
          })
        })
        ev.target.classList.remove('active');
      }
  }

  //sorteaza dupa prenume
  sortDupaPrenume(ev){
    if (ev.target.classList.contains('active') != true){
      this.setState({
        studenti: this.state.studenti.sort((a,b) =>{
          var nameA = a.prenume.toUpperCase(); 
          var nameB = b.prenume.toUpperCase();

          if (nameA < nameB) 
            return -1;
          
          if (nameA > nameB)
            return 1;
          
          return 0;
        })
      })
      ev.target.classList.add('active');
    }else{
      this.setState({
        studenti: this.state.studenti.sort((a,b) =>{
          var nameA = a.prenume.toUpperCase(); 
          var nameB = b.prenume.toUpperCase();

          if (nameA > nameB) 
            return -1;
          
          if (nameA < nameB)
            return 1;
          
          return 0;
        })
      })
      ev.target.classList.remove('active');
    }
}

//sorteaza dupa varsta
sortDupaVarsta(ev){
  if (ev.target.classList.contains('active') != true){
    this.setState({
      studenti: this.state.studenti.sort((a,b) =>{

        if (a.varsta < b.varsta) 
          return -1;
        
        if (a.varsta > b.varsta)
          return 1;
        
        return 0;
      })
    })
    ev.target.classList.add('active');
  }else{
    this.setState({
      studenti: this.state.studenti.sort((a,b) =>{ 

        if (a.varsta > b.varsta) 
          return -1;
        
        if (a.varsta < b.varsta)
          return 1;
        
        return 0;
      })
    })
    ev.target.classList.remove('active');
  }
}

//sorteaza dupa medie
sortDupaMedie(ev){
  if (ev.target.classList.contains('active') != true){
    this.setState({
      studenti: this.state.studenti.sort((a,b) =>{

        if (a.medie < b.medie) 
          return -1;
        
        if (a.medie > b.medie)
          return 1;
        
        return 0;
      })
    })
    ev.target.classList.add('active');
  }else{
    this.setState({
      studenti: this.state.studenti.sort((a,b) =>{ 

        if (a.medie > b.medie) 
          return -1;
        
        if (a.medie < b.medie)
          return 1;
        
        return 0;
      })
    })
    ev.target.classList.remove('active');
  }
} 

 

  render(){
    return(
      <div style={{"margin": "30px"}}>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
    <table className="table table-bordered table-dark">
      <thead>
    <tr>
      <th onClick={this.sortDupaNume}>Nume</th>
      <th onClick={this.sortDupaPrenume}>Prenume</th>
      <th onClick={this.sortDupaVarsta}>Varsta</th>
      <th onClick={this.sortDupaMedie}>Medie</th>
    </tr>
  </thead>
  <tbody>
      {
        this.state.studenti.map((x)=>{
         return (<Student nume={x.nume} prenume={x.prenume} varsta={x.varsta} medie={x.medie}/>)
        })
      }
  </tbody>
    </table>
    <div className="form-row">
      <div className="col">
      <input type="text" className="form-control" onChange={this.updateNume} id="nume" placeholder="Nume" />
      </div>
        <div className="col">
        <input type="text" className="form-control" onChange={this.updatePrenume} id="prenume" placeholder="Prenume" />
      </div>
      <div className="col">
      <input type="text" className="form-control" onChange={this.updateVarsta} id="varsta" placeholder="Varsta" />
      </div>
        <div className="col">
        <input type="text" className="form-control" onChange={this.updateMedie} id="medie" placeholder="Medie" />
      </div>
  </div>
      
  <button onClick={this.adaugaStudent} type="button" className="btn btn-secondary btn-lg btn-block" style={{"margin-top":"3px"}}>Adauga student in lista</button>


    </div>)
  }
}

export default Grupa;
