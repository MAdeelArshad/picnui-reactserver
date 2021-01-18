import React, { Component } from "react";
import axios from "axios";

class ProfileView extends Component {
  state = {

    CompleteProfile: "",
    pName: "",
    rName: "",
    points: [],
  };



  componentDidMount() {

    const p = this.props.selectedProfile;

    if (p.profile.linkedRoutine !== -1) {
      axios
        .post(`http://127.0.0.1:8000/GetRobotProfileWithRoutine/`, {
          profilePK: p.profilePK,
          routinePK: p.profile.linkedRoutine,
        })
        .then((res) => {
          console.log("Returned Data: " + res.data);
          let CompleteProfile = {
            profileName: p.profile.name,
            routineName: res.data.routineName,
            points: res.data.points,
          };

          this.setState({
            pName: CompleteProfile.profileName,
            rName: CompleteProfile.routineName,
            points: CompleteProfile.points,
          });

        })
        .catch((error) => {
          console.log("ERROR: "+error);
        });
    } else {
      let CompleteProfile = {
        profileName: p.profile.name,
        routineName: "N/A",
        points: [],
      };
      this.setState({
        pName: CompleteProfile.profileName,
        rName: CompleteProfile.routineName,
        points: CompleteProfile.points,
      });
    }

  }

  render() {
    return (
      <div>
        <div
        style={{
          padding: "1%",
          background: "black",
          opacity: ".8",
          color: "white",
        }}
      >
        <center>
          <h1>Robot Profile Details</h1>
        </center>
        <center>
          {console.log("Complete Satate: " + this.state)}
          <h2>{"Profile: " + this.state.pName}</h2>
          <h2>{"Linked Routine: " + this.state.rName}</h2>
        </center>

        <div
          style={{
            height: "13em",
            overflow: "scroll",
          }}
        >
          <table class="table table-striped" style={{ color: "white" }}>
            <thead>
              <tr>
                <th>Point x</th>
                <th>Point y</th>
                <th>Point z</th>
              </tr>
            </thead>
            <tbody>
              {console.log("Points Array: ", this.state.points)}

              {this.state.points.map((p) => (
                <tr>
                  <td>{p.x}</td>
                  <td>{p.y}</td>
                  <td>{p.z}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
      </div>
    );
  }
}

export default ProfileView;
