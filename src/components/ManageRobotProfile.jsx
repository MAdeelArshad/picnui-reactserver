import React, { Component } from "react";

const ViewRobotProfile = (props) => {
  return (
    <div style={{ height: "50em", overflow: "scroll" }}>
      <h1>Manage Robot Profiles</h1>
      {props.RobotProfileData.map((p) => (
        <div>
          <div
            class="card"
            style={{ opacity: ".7", color: "white", backgroundColor: "black" }}
          >
            <div class="card-header">
              <div class="row">
                <div class="col-md-4">{p.name}</div>
                <div class="col-md-5"> </div>
                <div class="col-md-1">
                  <button class="btn btn-info">View</button>{" "}
                </div>
                <div class="col-md-1">
                  <button class="btn btn-info">Edit</button>{" "}
                </div>
                <div class="col-md-1">
                  <button class="btn btn-danger">Delete</button>{" "}
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default ViewRobotProfile;
