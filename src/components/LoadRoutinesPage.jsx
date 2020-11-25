import React, { Component } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
// import Route from 'react-router-dom/Route';
import RoutineView from "./RoutineView";
const cors = require("cors");

export default class LoadRoutines extends Component {
  state = {
    Routines: this.props.routines,
    // Routines: [],
  };

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/AllRoutine/`).then((res) => {
      console.log(res.data);
      // const Routines = res.data;
      // this.setState({ Routines });
    });
  }

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
            backgroundColor: "transparent",
          }}
        >
          {this.state.Routines.map((r) => (
            <NavLink to="/RoutineView" style={{ margin: "1%" }}>
              <button className="btn btn-primary" key={r.name}>
                {r.name}
              </button>
            </NavLink>
          ))}
        </div>
        <Route path="/RoutineView" exact component={() => <RoutineView />} />
      </Router>
    );
  }
}
