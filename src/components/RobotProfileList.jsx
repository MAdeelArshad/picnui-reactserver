import React from "react";
// import {
//   BrowserRouter as Router,
//   NavLink,
//   Route,
//   Link,
// } from "react-router-dom";

const RoboProfileList = (props) => {
  return (
    <div style={{ padding: "1%" }}>
      <h1> Registered Robot Profiles : </h1>
      <div
        className="row"
        style={{
          //   margin: "1%",
          backgroundColor: "darkslategray",
          opacity: ".6",
          overflow: "auto",
          width: "85%",
          height: "35em",
        }}
      >
        {props.ProfileData.map((r) => (
          <div
            className="card"
            key={r}
            style={{
              margin: "1%",
              backgroundColor: "transparent",
              color: "ThreeDDarkShadow",
              border: "1px solid white",
              fontFamily: "monospace"
            }}
          >
            <div key={r} className="card-header">
              <b style={{
                color: "white",
                fontFamily: "unset",
                fontWeight: "100%"
              }}>Profile: </b>
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
