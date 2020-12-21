import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProfileView from "./RobotProfileView";

class ViewRobotProfile extends Component {
  state = {
    // Profiels [{'profilePK': 1, 'profile': {'name': 'profile1', 'linkedRoutine': 1}}, ...]
    Profiles: [],
    selectedProfile: "",
    CompleteProfile: {},
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
  }

  handleView = (p) => {
    // axios
    //   .post(`http://127.0.0.1:8000/GetRobotProfileWithRoutine/`, {
    //     profilePK: p.profilePK,
    //     routinePK: p.profile.linkedRoutine,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     let CompleteProfile = {
    //       profileName: p.profile.name,
    //       routineName: res.data.routineName,
    //       points: res.data.points,
    //     };
    //     this.setState({
    //       CompleteProfile: CompleteProfile,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    this.setState({
      selectedProfile: p,
    });
    // console.log(p);
  };

  handleEdit = (p) => {
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
          "? \n Note: that the routine lined to this profile will be unlinked but not deleted!"
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
            Profiles.pop(this.state.selectedProfile);
            this.setState({ Profiles: Profiles });
          }

          console.log("After Deletion State: ", this.state.Profiles);
        });
    } else {
      console.log("No Delete");
    }

    // console.log("del: ", p);
  };

  render() {
    return (
      <Router>
        <div style={{ height: "30em", overflow: "scroll" }}>
          <h1>Manage Robot Profiles</h1>
          {this.state.Profiles.map((p) => (
            <div key={p.profile.name}>
              <div
                class="card"
                style={{
                  opacity: ".7",
                  color: "white",
                  backgroundColor: "black",
                }}
              >
                <div class="card-header">
                  <div class="row">
                    <div class="col-md-4">{p.profile.name}</div>
                    <div class="col-md-5"> </div>
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
                  </div>
                </div>
              </div>
              <br />
            </div>
          ))}
        </div>
        <Route
          path="/ProfileView"
          exact
          component={() => (
            <ProfileView
              // profile={this.state.CompleteProfile}
              selectedProfile={this.state.selectedProfile}
            />
          )}
        />
      </Router>
    );
  }
}

export default ViewRobotProfile;
