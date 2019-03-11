import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

var ID = function() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

class Grupa extends React.Component {
  constructor() {
    super();
    this.state = {
      studenti: [],
      campuri: [
        {
          numeCamp: "nume",
          displayName: "Nume"
        },
        {
          numeCamp: "prenume",
          displayName: "Prenume"
        },
        {
          numeCamp: "media",
          displayName: "Media"
        }
      ],
      dateNoi: {},
      sortData: {
        directieSortare: 0,
        id_coloana: null
      },
      isLoaded: false,
      viewMode: "List",
      viewOptions: ["List", "Grid"],
      lastViewMode: "List" //list [single, this.state.focusStudent] grid
    };
  }

  componentDidMount() {
    this.setState({
      studenti: this.state.studenti.map(x => {
        x.key = ID();
        return x;
      })
    });
    fetch("https://demo3305866.mockable.io/studenti_date_avansate")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            studenti: [...this.state.studenti, ...result].map(x => {
              x.key = ID();
              return x;
            })
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
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
      studenti: this.state.studenti.sort((a, b) => {
        var x = a[event.target.id];
        var y = b[event.target.id];
        if (x > y) {
          return directieSortare;
        } else if (x < y) {
          return directieSortare * -1;
        }
        return 0;
      })
    });
  };
  removeStudent = event => {
    this.setState({
      studenti: this.state.studenti.filter(x => {
        return x.nume + x.prenume != event.target.id;
      })
    });
  };
  updateSearch = event => {
    this.setState({
      searchWord: event.target.value
    });
  };
  updateData = event => {
    this.setState({
      dateNoi: {
        ...this.state.dateNoi,
        [event.target.id]: event.target.value
      }
    });
  };
  insertData = event => {
    this.setState({
      studenti: [...this.state.studenti, this.state.dateNoi]
    });
  };

  clickRow = data => {
    this.setState({
      viewMode: "single",
      focusStudent: data,
      generalViewMode: this.state.viewMode
    });
  };

  getStyle = clicked => {
    if (clicked == undefined) {
      return {};
    } else {
      return { "background-color": "lightblue" };
    }
  };
  deleteSelected = () => {
    this.setState({
      studenti: this.state.studenti.filter(x => {
        return x.clicked != true;
      })
    });
  };

  GridMode = () => {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
        <select
          className="custom-select"
          id="inputGroupSelect01"
          onChange={event => this.changeView(event.target.value)}
        >
          {this.state.viewOptions.map(x => {
            if (this.state.viewMode == x) return <option selected>{x}</option>;
            return <option>{x}</option>;
          })}
        </select>
        <div className="wrapper" width="400px">
          {this.state.studenti.map(x => {
            return (
              <div className="box">
                <img
                  onClick={() => this.clickRow(x.key)}
                  src={x.photo_url}
                  width="120px"
                />
                <p>{x.nume + " " + x.prenume}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  ListMode = () => {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
        <select
          className="custom-select"
          id="inputGroupSelect01"
          onChange={event => this.changeView(event.target.value)}
        >
          {this.state.viewOptions.map(x => {
            return <option>{x}</option>;
          })}
        </select>
        <table className="table table-striped  table-dark">
          <tr key={ID()}>
            {this.state.campuri.map(x => {
              return (
                <th key={ID()} id={x.numeCamp} onClick={this.sortData}>
                  {x.displayName}
                </th>
              );
            })}
          </tr>
          {this.state.studenti.map(student => {
            if (
              student.nume.search(new RegExp(this.state.searchWord, "i")) !=
                0 &&
              student.prenume.search(new RegExp(this.state.searchWord, "i")) !=
                0
            ) {
              return null;
            }
            return (
              <tr>
                {this.state.campuri.map(camp => {
                  return (
                    <th onClick={() => this.clickRow(student.key)} key={ID()}>
                      {student[camp.numeCamp]}
                    </th>
                  );
                })}
                <th>
                  <button
                    className="btn btn-danger"
                    onClick={this.removeStudent}
                    id={student.nume + student.prenume}
                  >
                    Delete
                  </button>
                </th>
              </tr>
            );
          })}

          <tr key={ID()}>
            {this.state.campuri.map(x => {
              return (
                <th key={ID()}>
                  <input
                    className="inputten"
                    onChange={this.updateData}
                    placeholder={x.displayName + "..."}
                    id={x.numeCamp}
                  />
                </th>
              );
            })}
            <th>
              <button className="btn btn-success" onClick={this.insertData}>
                Insert
              </button>
            </th>
          </tr>
          <tr className="searchContainer">
            <input placeholder="Search..." onChange={this.updateSearch} />
            <div class="search" />
          </tr>
        </table>
      </div>
    );
  };

  changeView = mode => {
    this.setState({
      viewMode: mode,
      generalViewMode: this.state.viewMode
    });
  };

  SingleMode = () => {
    var student = this.state.studenti.filter(x => {
      return x.key === this.state.focusStudent;
    })[0];
    return (
      <div>
        <button onClick={() => this.changeView(this.state.generalViewMode)}>
          Back
        </button>
        <br />
        Nume: {student.nume}
        <br />
        Prenume: {student.prenume}
        <br />
        Telefon: {student.nr_telefon}
        <br />
        Data nasterii: {student.data_nasterii.ziua}/{" "}
        {student.data_nasterii.luna}/{student.data_nasterii.anul}
        <br />
        <img src={student.photo_url} width="300px" />
      </div>
    );
  };

  render() {
    if (this.state.isLoaded == false) {
      return <h1>Data is loading... please wait</h1>;
    }
    if (this.state.viewMode === "List") {
      return <this.ListMode />;
    } else if (this.state.viewMode === "single") {
      return <this.SingleMode />;
    } else if (this.state.viewMode === "Grid") {
      return <this.GridMode />;
    }
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Grupa />, rootElement);
