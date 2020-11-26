import React, { Component } from "react";

const RoutineListItem = (props) => {
  return (
    <div>
      <div
        class="card"
        style={{ opacity: ".7", backgroundColor: "black", color: "white" }}
      >
        <div class="card-header">
          <div class="row">
            <div class="col-md-4"> {props.routine.name} </div>
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
  );
};

export default RoutineListItem;
