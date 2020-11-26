import React, { Component } from "react";

const Profile = (props) => {
  return (
    <div className="col-2">
      <div class="card" style={{ opacity: ".8" }}>
        <div class="card-header">
          <center>
            {" "}
            <img
              src={window.location.origin + props.url}
              width="150px"
              height="150px"
            />{" "}
          </center>
        </div>
        <div class="card-body">
          <center>
            <b>{props.name}</b>
          </center>
        </div>
        <div class="card-footer">
          <center>
            <b>{props.data}</b>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Profile;
