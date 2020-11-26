import React, { Component } from "react";

const RoutineView = (props) => {
  return (
    <div>
      <h2>Pick and Place 1</h2>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>Point x</th>
            <th>Point y</th>
            <th>Point z</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2.58</td>
            <td>3.33</td>
            <td>0.24</td>
          </tr>
          {/* <tr>
            <td>Mary</td>
            <td>Moe</td>
            <td>mary@example.com</td>
          </tr>
          <tr>
            <td>July</td>
            <td>Dooley</td>
            <td>july@example.com</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default RoutineView;
