import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProfileView from "./RobotProfileView";
import Modal from "react-modal";

class ViewRobotProfile extends Component {
  state = {
    // Profiels [{'profilePK': 1, 'profile': {'name': 'profile1', 'linkedRoutine': 1}}, ...]
    Routines: [],
    Profiles: [],
    selectedProfile: "",
    selectedRoutine: "",
    // CompleteProfile: {},
    showModal: false,
    showRoutinesDisabled: true,
    unlinkRoutineBtnDisabled: false,
    changeRoutineBtnDisabled: false,
    updateRoutineBtnDisabled: true,
  };

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/GetRobotProfiles/`)
      .then((res) => {
        console.log(res.data.ProfilesList);
        this.setState({
          Profiles: res.data.ProfilesList,
        });
      })
      .catch((error) => {
        console.log(error);
      });

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

  handleView = (p) => {
 
    this.setState({
      selectedProfile: p,
    });

  };

  handleEdit = (p) => {


    this.setState({
      selectedProfile: p,
    });

    let NewProfileName = window.prompt("Enter New Profile Name: ");
    if (NewProfileName === null) {
      // on cancel returns null & no action is required
    } else if (NewProfileName === "") {
      window.alert("Empty Profile Field !!! Try Again...");
    } else if (NewProfileName === p.profile.name) {
      window.alert("Dupliacte Profile Name !!! Try Again...");
    } else {
      console.log(NewProfileName);
      console.log(p);
      axios
        .put(`http://127.0.0.1:8000/UpdateRobotProfile/`, {
          profilePK: p.profilePK,
          oldProfileName: p.profile.name,
          NewProfileName: NewProfileName,
          ChangeLinking: false,
          linkedRoutine: p.profile.linkedRoutine,
        })
        .then((res) => {
          console.log(res.data);

          if (res.data.isUpdated === true) {
            // Making Shallow copy of Array
            let UpdatedProfileList = [...this.state.Profiles];
            // Finding the index of the selected routine
            let itemIndex = UpdatedProfileList.indexOf(p);
            // make shallow copy of the routine item present at the above index
            let item = { ...UpdatedProfileList[itemIndex] };
            // change value
            item.profile.name = NewProfileName;
            // replace the item back into the array
            UpdatedProfileList[itemIndex] = item;
            // update the state
            this.setState({ Profiles: UpdatedProfileList });
            window.alert("The Change has been Successfully Reflected!");
          } else {
            console.log("not Updated");
          }
        })
        .catch((error) => {
          window.alert("ERROR: " + error);
        });
    }
  };

  handleDelete = (p) => {
    // alert(r.routineName);
    this.setState({
      selectedProfile: p,
    });
    if (
      window.confirm(
        "Do you want to delete this robot profile: " +
        p.profile.name +
        "? \n Note: that the routine linked to this profile will be unlinked but not deleted!"
      )
    ) {
      console.log("Yes Delete");
      axios
        .delete("http://127.0.0.1:8000/DeleteRobotProfile/", {
          data: p,
        })
        .then((res) => {
          console.log("Delection Response: " + res.data.isDeleted);

          if (res.data.isDeleted === true) {
            let Profiles = [...this.state.Profiles];
            let index = Profiles.indexOf(p);
            Profiles.splice(index,1);
            this.setState({ Profiles: Profiles });
            window.alert(
              "The Selected Robot Profile has been Successfully Deleted!"
            );
          }

          console.log("After Deletion State: ", this.state.Profiles);
        });
    } else {
      console.log("No Delete");
    }

    // console.log("del: ", p);
  };

  handleRoutinesOptionsOnChange = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    this.setState({
      selectedRoutine: event.target.value,
    });
  };

  setModelisOpen = (check) => {
    this.setState({ showModal: check});
    this.setState({
      showRoutinesDisabled: true,
      updateRoutineBtnDisabled: true,
      unlinkRoutineBtnDisabled: false,
    });
  };

  handleUnlinkRoutine = (p) => {
    if (p.profile.linkedRoutine === -1) {
      window.alert("Already Unlinked!");
    } else {
      axios
        .put(`http://127.0.0.1:8000/UpdateRobotProfile/`, {
          profilePK: p.profilePK,
          ChangeLinking: true,
          linkedRoutine: -1,
        })
        .then((res) => {
          console.log(res.data);

          if (res.data.isUpdated === true) {
            // Making Shallow copy of Array
            let UpdatedProfileList = [...this.state.Profiles];
            // Finding the index of the selected routine
            let itemIndex = UpdatedProfileList.indexOf(p);
            // make shallow copy of the routine item present at the above index
            let item = { ...UpdatedProfileList[itemIndex] };
            // change value
            item.profile.linkedRoutine = -1;
            // replace the item back into the array
            UpdatedProfileList[itemIndex] = item;
            // update the state
            this.setState({ Profiles: UpdatedProfileList });
            window.alert("Routine Unlinked!");
          } else {
            console.log("not Updated");
          }
        })
        .catch((error) => {
          window.alert("ERROR: " + error);
        });
    }
  };

  handleChangeRoutine = () => {
    this.setState({
      showRoutinesDisabled: false,
      updateRoutineBtnDisabled: false,
      unlinkRoutineBtnDisabled: true,
    });
  };

  handleUpdateRoutine = (p) => {
    // if (this.state.selectedRoutine === "") console.log("TRUE");
    // console.log(this.state.selectedRoutine);
    // window.alert("Testing: " + this.state.selectedRoutine);
    if (
      this.state.selectedRoutine === "SelectRoutine" ||
      this.state.selectedRoutine === ""
    ) {
      window.alert("Routine is not selected!");
    } else {
      axios
        .put(`http://127.0.0.1:8000/UpdateRobotProfile/`, {
          profilePK: p.profilePK,
          ChangeLinking: true,
          linkedRoutine: this.state.selectedRoutine,
        })
        .then((res) => {
          console.log("Result Returned: " + res.data);

          if (res.data.isUpdated === true) {
            // Making Shallow copy of Array
            let UpdatedProfileList = [...this.state.Profiles];
            // Finding the index of the selected routine
            let itemIndex = UpdatedProfileList.indexOf(p);
            // make shallow copy of the routine item present at the above index
            let item = { ...UpdatedProfileList[itemIndex] };
            // change value
            item.profile.linkedRoutine = this.state.selectedRoutine;
            // replace the item back into the array
            UpdatedProfileList[itemIndex] = item;
            // update the state
            this.setState({ Profiles: UpdatedProfileList });
            window.alert("Routine linked Changed Successfully!!!");
          } else {
            console.log("not Updated");
          }

        })
        .catch((error) => {
          window.alert("ERROR: " + error);
        });
    }
  };

  render() {
    return (
      <Router>
        <Modal
          isOpen={this.state.showModal}
          onRequestClose={() => this.setModelisOpen(false)}
          className="Modal"
        >
          <center>
            <div
              style={{
                width: "25em",
                height: "20em",
                backgroundColor: "white",
                marginTop: "2em",
                border: "1px solid black",
              }}
            >
              <h2>Routine Linking/Unlinking</h2>
              <span>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    this.handleUnlinkRoutine(this.state.selectedProfile)
                  }
                  disabled={this.state.unlinkRoutineBtnDisabled}
                >
                  Unlink Routine
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleChangeRoutine()}
                  disabled={this.state.changeRoutineBtnDisabled}
                >
                  Change Routine
                </button>
              </span>
              <br />
              <br />
              <select
                onChange={this.handleRoutinesOptionsOnChange}
                disabled={this.state.showRoutinesDisabled}
              >
                <option value="SelectRoutine">Select Routine:</option>

                {this.state.Routines.map((r) => (
                  <option value={r.routineID}>{r.routineName}</option>
                ))}
              </select>
              <br />
              <br />
              <button
                className="btn btn-primary"
                onClick={() =>
                  this.handleUpdateRoutine(this.state.selectedProfile)
                }
                disabled={this.state.updateRoutineBtnDisabled}
              >
                Update Linked Routine
              </button>
              &nbsp;&nbsp;
              <button
                className="btn btn-danger"
                onClick={() => this.setModelisOpen(false)}
              >
                close
              </button>
            </div>
          </center>
        </Modal>

        <div style={{ height: "auto", overflow: "auto" }}>
          <h1>Manage Robot Profiles</h1>
          {this.state.Profiles.length > 0 ? (
            this.state.Profiles.map((p) => (
              <div key={p.profile.name}>
                <div
                  class="card"
                  style={{
                    opacity: ".7",
                    color: "white",
                    backgroundColor: "black",
                  }}
                >
                  <div class="card-header" key={p.profile.name}>
                    <div class="row" key={p.profile.name}>
                      <div class="col-md-4">{p.profile.name}</div>
                      <div class="col-md-4"> </div>
                      <div class="col-md-1">
                        <Link to="/ProfileView">
                          <button
                            class="btn btn-info"
                            onClick={() => this.handleView(p)}
                          >
                            View
                        </button>
                        </Link>
                      </div>
                      <div class="col-md-1">
                        <button
                          class="btn btn-info"
                          onClick={() => this.handleEdit(p)}
                        >
                          Edit
                      </button>
                      </div>
                      <div class="col-md-1">
                        <button
                          class="btn btn-danger"
                          onClick={() => this.handleDelete(p)}
                        >
                          Delete
                      </button>
                      </div>
                      <div class="col-md-1">
                        <button
                          class="btn btn-warning"
                          onClick={() => {
                            this.setState({ showModal: true, selectedProfile: p });
                            this.setState({
                              showRoutinesDisabled: true,
                              updateRoutineBtnDisabled: true,
                              unlinkRoutineBtnDisabled: false,
                            });
                          }}
                        >
                          Change Routine
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
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
              } >Currently no Profile is inserted </h3>
            )}

        </div>
        <Route
          path="/ProfileView"
          exact
          component={() => (
            <ProfileView
              
              selectedProfile={this.state.selectedProfile}
            />
          )}
        />
      </Router>
    );
  }
}

export default ViewRobotProfile;
