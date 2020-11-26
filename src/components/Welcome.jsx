import React, { Component } from "react";
import Profile from "./Profile";
import { BrowserRouter as Router } from "react-router-dom";

class Welcome extends Component {
  state = {
    profileData: [
      {
        url: "/Images/ProfileImages/Moazzam.jpg",
        name: "Abdul Muazzam",
        data: "SP17-BSE-033",
      },
      {
        url: "/Images/ProfileImages/Faizan.jpg",
        name: "Faizan Haider",
        data: "SP17-BSE-108",
      },
      {
        url: "/Images/ProfileImages/Adeel.jpg",
        name: "Adeel Arshd",
        data: "SP17-BSE-132",
      },
    ],

    SupervisorprofileData: [
      {
        url: "/Images/ProfileImages/Dr Wajahat.jpg",
        name: "Dr. Wajahat",
        data: "Supervisor",
      },
      {
        url: "/Images/ProfileImages/Dr Aksam.jpg",
        name: "Dr. Aksam",
        data: "Co. Supervisor",
      },
    ],
  };

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <h1>
            Programming Industrial Cobots Using Natural User Interaction
            (PICNUI)
          </h1>
          <div className="row">
            <div className="col">
              <blockquote>
                <i>
                  Cobots are the key element of the industrial revolution. They
                  collaborate with humans to perform repetitive tasks.
                  Currently, cobots are being trained using Teach pendant and
                  Lead through methods. These methods are very hectic,
                  difficult, and costly, highly skilled labor is also required
                  to perform these methods. This project aims to minimize these
                  difficulties by providing a rapid programming model, that
                  consists of a platform to train cobots using natural user
                  interactions. The project will involve a Kinect sensor to
                  obtain user interactions (hand gestures and verbal commands).
                  The system will propose a solution using the inputs obtained
                  from the Kinect sensor. This proposed solution is hybrid in
                  which the UR robot (cobot) is simulated in WEBOTS/UR Virtual
                  Machine that is controlled by a human in the real-world
                  through natural user interactions. The use of a simulated
                  environment is because of the non-availability of the physical
                  UR Cobot.
                </i>
              </blockquote>
            </div>
          </div>

          <h3>Developed By:</h3>
          <div className="row">
            <div className="col-0"></div>
            {this.state.profileData.map((p) => Profile(p))}
            <div className="col-1"></div>
          </div>
          <br />
          <h3>Under Supervision of:</h3>
          <div className="row">
            <div className="col-0"></div>
            {this.state.SupervisorprofileData.map((p) => Profile(p))}
            <div className="col-2"></div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Welcome;
