import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// import Route from 'react-router-dom/Route';
import RoutineView from "./RoutineView";

export default class LoadRoutines extends Component {
  state = {
    Routines: [],
    selectedRoutine: "",
  };

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/GetRoutines/`)
      .then((res) => {
        console.log(res.data.routineData);
        this.setState({
          Routines: res.data.routineData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleView = (r) => {
    this.setState({
      selectedRoutine: r,
    });
  };

  render() {
    return (
      <Router>
        <h1> Registered Routines: </h1>
        <div
          className="row"
          style={{
            margin: "2%",
            overflow: "scroll",
            height: "30%",
            backgroundColor: "black",
            opacity: ".8",
          }}
        >
          {this.state.Routines.map((r) => (
            <NavLink key={r} to="/RoutineView" style={{ margin: "1%" }}>
              <button
                className="btn btn-primary"
                key={r.routineName}
                onClick={() => this.handleView(r)}
              >
                {r.routineName}
              </button>
            </NavLink>
          ))}
        </div>
        <Route
          path="/RoutineView"
          exact
          component={() => <RoutineView routine={this.state.selectedRoutine} />}
        />
      </Router>
    );
  }
}
