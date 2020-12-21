import React, { Component } from "react";
import axios from "axios";

export default class RobotProfile extends Component {
  state = {
    Routines: [],
    ProfileName: "",
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

  handleNameInputOnChange = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRoutinesOptionsOnChange = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    this.setState({
      selectedRoutine: event.target.value,
    });
  };

  handleSave = () => {
    if (
      this.state.ProfileName !== "" &&
      this.state.selectedRoutine !== "SelectRoutine" &&
      this.state.selectedRoutine !== ""
    ) {
      console.log(this.state.ProfileName);
      console.log(this.state.selectedRoutine);
      console.log("Saved");
      let data = {
        ProfileName: this.state.ProfileName,
        LinkedRoutine: this.state.selectedRoutine,
      };
      axios
        .post(`http://127.0.0.1:8000/SaveRobotProfile/`, data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          window.alert(error + "\n Duplicate Profile Name !!! Try Again");
        });
    } else {
      console.log("Not Saved");
      window.alert(
        "Either Profile name is empty (OR) Routine is not selected !!! Try Again"
      );
      this.setState({ ProfileName: "", selectedRoutine: "" });
    }
    this.setState({ ProfileName: "", selectedRoutine: "" });
  };

  render() {
    return (
      <div>
        <h2>Add Robot Profiles</h2>

        <br />
        <br />
        <br />
        <br />
        <br />
        <center>
          <div
            style={{
              backgroundColor: "black",
              opacity: ".7",
              width: "40%",
              padding: "1%",
              color: "white",
            }}
          >
            <h3>Add Profile Info</h3>
            <table
              className="table table-borderless"
              style={{ color: "white" }}
            >
              <tr>
                <td>
                  <label for="Profile Name" className="mr-sm-2">
                    Name:
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control mb-2 mr-sm-2"
                    placeholder="Enter Profile Name"
                    id="Profile Name"
                    name="ProfileName"
                    onChange={this.handleNameInputOnChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="Routines" className="mr-sm-2">
                    Routine:
                  </label>
                </td>
                <td>
                  <select onChange={this.handleRoutinesOptionsOnChange}>
                    <option value="SelectRoutine">Select Routine:</option>

                    {this.state.Routines.map((r) => (
                      <option value={r.routineID}>{r.routineName}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <center>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handleSave()}
                    >
                      Add
                    </button>
                  </center>
                </td>
              </tr>
            </table>
          </div>
        </center>
      </div>
    );
  }
}
