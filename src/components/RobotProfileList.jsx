import React, { Component } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Link,
} from "react-router-dom";

const RoboProfileList = (props) => {
  return (
    <div style={{ padding: "1%" }}>
      <h1> Registered Robot Profiles : </h1>
      <div
        className="row"
        style={{
          //   margin: "1%",
          backgroundColor: "black",
          opacity: ".6",
          overflow: "scroll ",
          width: "100%",
          height: "48em",
        }}
      >
        {props.ProfileData.map((r) => (
          <div
            className="card"
            style={{
              margin: "1%",
              backgroundColor: "transparent",
              color: "white",
              border: "1px solid white",
            }}
          >
            <div className="card-header">
              <b>Profile: </b>
              {r.name}
              <hr style={{ backgroundColor: "white" }} />
              <b>Routine: </b> {r.routine}
            </div>
          </div>
        ))}
      </div>
      {/* <Route path="/RoutineView" exact component={() => <RoutineView />} /> */}
    </div>
  );
};

export default RoboProfileList;
