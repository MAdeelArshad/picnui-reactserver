import React, { Component } from "react";
import axios from "axios";

class ProfileView extends Component {
  state = {
    // Profile: this.props.profile,
    // profile: this.props.profile.profileName,
    // routine: this.props.profile.routineName,
    // points: this.props.profile.points,
    p: this.props.selectedProfile,
    CompleteProfile: "hi",
    pName: "",
    rName: "",
    points: [],
  };

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    // this.state = { counter: 0 };
  }

  componentDidMount() {
    // this.setState({
    //   profile: this.props.profile.profileName,
    //   routine: this.props.profile.routineName,
    //   points: this.props.profile.points,
    // });
    // this.setState({
    //   selectedProfile: p,
    // });

    const p = this.state.p;
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
        // this.state = { CompleteProfile: CompleteProfile };
        // this.state = {
        //   pName: CompleteProfile.profileName,
        //   rName: CompleteProfile.routineName,
        //   points: CompleteProfile.points,
        // };
        this.setState({
          pName: CompleteProfile.profileName,
          rName: CompleteProfile.routineName,
          points: CompleteProfile.points,
        });
        // this.state = { rName: CompleteProfile.routineName };
        // this.state = { points: CompleteProfile.points };
        console.log("Constructure Inside 1: " + this.state.pName);
        console.log("Constructure Inside 2: " + this.state.rName);
        console.log("Constructure Inside 3: " + this.state.points);

        // this.setState({
        //   CompleteProfile: CompleteProfile,
        // });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Constructure: " + this.state.CompleteProfile);
  }

  render() {
    return (
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
              {/* {console.log(
                "Selected Profile: " + this.state.p.profile.linkedRoutine
              )} */}
              {console.log("Points Array: ", this.state.points)}

              {this.state.points.map((p) => (
                <tr>
                  <td>{p.x}</td>
                  <td>{p.y}</td>
                  <td>{p.z}</td>
                </tr>
              ))}
              {/* {this.state.points.map((p) => (
                <tr>
                  <td>{p.x}</td>
                  <td>{p.y}</td>
                  <td>{p.z}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ProfileView;
