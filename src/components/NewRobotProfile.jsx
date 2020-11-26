import React, { Component } from "react";

export default class RobotProfile extends Component {
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
                  {" "}
                  <input
                    type="text"
                    className="form-control mb-2 mr-sm-2"
                    placeholder="Enter Profile Name"
                    id="Profile Name"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label for="email" className="mr-sm-2">
                    Routine:
                  </label>
                </td>
                <td>
                  <select>
                    <option value="0">Select Routine:</option>
                    <option value="1">Audi</option>
                    <option value="2">BMW</option>
                    <option value="3">Citroen</option>
                    <option value="4">Ford</option>
                    <option value="5">Honda</option>
                    <option value="6">Jaguar</option>
                    <option value="7">Land Rover</option>
                    <option value="8">Mercedes</option>
                    <option value="9">Mini</option>
                    <option value="10">Nissan</option>
                    <option value="11">Toyota</option>
                    <option value="12">Volvo</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <center>
                    <button className="btn btn-primary">Add</button>
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
