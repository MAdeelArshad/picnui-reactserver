import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import RoutineView from "./RoutineView";
import axios from "axios";

export default class ManageRoutines extends Component {
  // Selected Routine {points: [], routineID: 19, routineName: ''}
  state = {
    routinesList: [],
    selectedRoutine: "",
    profilesList: [],
  };

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/GetRoutines/`)
      .then((res) => {
        // console.log("RoutinesList: " + res.data.routineData);
        this.setState({
          routinesList: res.data.routineData,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`http://127.0.0.1:8000/GetRobotProfiles/`)
      .then((res) => {
        // console.log("profileList: " + res.data.ProfilesList);
        this.setState({
          profilesList: res.data.ProfilesList,
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

  handleEdit = (r) => {
    let NewRoutineName = window.prompt("Enter New Routine Name: ");
    if (NewRoutineName === null) {
      // on cancel returns null & no action is required
    } else if (NewRoutineName === r.routineName) {
      window.alert("Dupliacte Routine Name !!! Try Again...");
    } else if (NewRoutineName === "") {
      window.alert("Empty Routine Field !!! Try Again...");
    } else {
      console.log(NewRoutineName);
      console.log(r);
      axios
        .put(`http://127.0.0.1:8000/UpdateRoutine/`, {
          routineID: r.routineID,
          oldRoutineName: r.routineName,
          newRoutineName: NewRoutineName,
        })
        .then((res) => {
          console.log(res.data);
          // Making Shallow copy of Array
          let UpdatedroutineList = [...this.state.routinesList];
          // Finding the index of the selected routine
          let itemIndex = UpdatedroutineList.indexOf(r);
          // make shallow copy of the routine item present at the above index
          let item = { ...UpdatedroutineList[itemIndex] };
          // change value
          item.routineName = NewRoutineName;
          // replace the item back into the array
          UpdatedroutineList[itemIndex] = item;
          // update the state
          this.setState({ routinesList: UpdatedroutineList });
        })
        .catch((error) => {
          window.alert("ERROR: " + error);
        });
    }
  };

  handleDelete = (r) => {
    // alert(r.routineName);
    let CheckLinking = false;
    this.state.profilesList.forEach((element) => {
      console.log("-----");
      console.log(element.profile.linkedRoutine);
      console.log(r.routineID);

      if (element.profile.linkedRoutine == r.routineID) {
        console.log(
          "Cannot delete this Routine as it is already linked with the " +
            r.routineName +
            " Profile!"
        );
        CheckLinking = true;
      }
      console.log("-----");
    });

    if (CheckLinking) {
      window.alert(
        "Cannot delete this Routine as it is already linked with the (" +
          r.routineName +
          ") Profile!"
      );
    } else {
      if (
        window.confirm(
          "Do you want to delete the Routine Named: " + r.routineName + "?"
        )
      ) {
        console.log("Yes Delete");
        axios
          .delete("http://127.0.0.1:8000/DeleteRoutine/", {
            data: {
              routinePK: r.routineID,
              routineName: r.routineName,
            },
          })
          .then((res) => {
            console.log("Delection Response: " + res.data.isDeleted);

            if (res.data.isDeleted === true) {
              let routinesList = [...this.state.routinesList];
              routinesList.pop(this.state.selectedRoutine);
              this.setState({ routinesList: routinesList });
            }

            console.log(this.state.routinesList);
          });
      } else {
        console.log("No Delete");
      }
    }

    // console.log("del: ", r);
  };

  render() {
    return (
      <Router>
        <h1> Manage Routines: </h1>

        <div className="col " style={{ overflow: "scroll", height: "23em" }}>
          {this.state.routinesList.map((r) => (
            <div>
              <div
                class="card"
                style={{
                  opacity: ".8",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <div class="card-header">
                  <div class="row">
                    <div class="col-md-4"> {r.routineName} </div>
                    <div class="col-md-5"> </div>
                    <div class="col-md-1">
                      <NavLink to="/RoutineView" style={{ margin: "1%" }}>
                        <button
                          class="btn btn-info"
                          onClick={() => this.handleView(r)}
                        >
                          View
                        </button>
                      </NavLink>
                    </div>
                    <div class="col-md-1">
                      <button
                        class="btn btn-info"
                        onClick={() => this.handleEdit(r)}
                      >
                        Edit
                      </button>
                    </div>
                    <div class="col-md-1">
                      <button
                        class="btn btn-danger"
                        onClick={() => this.handleDelete(r)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </div>
          ))}
        </div>

        <br />
        <Route
          path="/RoutineView"
          exact
          component={() => <RoutineView routine={this.state.selectedRoutine} />}
        />
      </Router>
    );
  }
}
