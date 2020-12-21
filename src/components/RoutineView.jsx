import React from "react";

const RoutineView = (props) => {
  return (
    <div
      style={{
        backgroundColor: "black",
        opacity: ".8",
        color: "white",
        margin: "1%",
        padding: "2em",
      }}
    >
      <center>
        {/* {console.log(props)} */}
        <h2>{props.routine.routineName}</h2>
      </center>

      <div
        style={{
          height: "15em",
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
            {props.routine.points.map((p) => (
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
  );
};

export default RoutineView;
