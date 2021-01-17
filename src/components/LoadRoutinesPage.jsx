import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
// import Route from 'react-router-dom/Route';
import RoutineView from "./RoutineView";
import SimDialogBox from "./SimulationDialogBox";

export default class LoadRoutines extends Component {
  state = {
    Routines: [],
    selectedRoutine: "",
    modalMessege: "Currently this service is disable ",
    modalStatus: false,
    
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

  closeWarningModal = () => {
    this.setState(
      {
        modalStatus: false,
        modalMessege: ""

      })
  }

  handleRoutineDeployment = () => {
    console.log("points before going to the Simulation: " + this.state.selectedRoutine.points.length)
    console.log(this.state.selectedRoutine)
    this.setState(
      {
        modalStatus: true,
        modalMessege: ""

      })
  }

  render() {
    return (
      <Router>
        <h1> Registered Routines: </h1>
        <div
          className="row"
          style={{
            margin: "2%",
            overflow: "auto",
            height: "30%",
            backgroundColor: "black",
            opacity: ".8",
          }}
        >
           
          {this.state.Routines.length > 0 ? (

            this.state.Routines.map((r) => (
              <div style={{margin: "2%",}}><NavLink key={r} to="/RoutineView" style={{ margin: "1%" }}>
              <button
                className="btn btn-primary"
                key={r.routineName}
                onClick={() => this.handleView(r)}
              >
                {r.routineName}
              </button>
              

            </NavLink>

            <SimDialogBox option={{
    open: this.state.modalStatus,
    onClose: this.closeWarningModal,
    messege: this.state.selectedRoutine
  }}  />
            </div>
            ))
          ) : (
              <h3 style={
                {
                  padding: "2em",
                  backgroundColor: "white",
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  color: "darkred"

                }
              } >Currently no routine is inserted </h3>
            )}


        </div>

              <div className="row">
              <div className="col-md-10">
                </div>
              <div className="col-md-2">
                {this.state.selectedRoutine !== "" ? <button onClick={() => {this.handleRoutineDeployment()}} className="btn btn-primary" >Deploy Training Routine</button> : ""}
                
              </div>
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
