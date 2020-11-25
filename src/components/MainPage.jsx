import React, { Component } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Link,
} from "react-router-dom";
import LoadRoutines from "./LoadRoutinesPage";
import ManageRoutines from "./ManageRoutinesPage";
import NewRoutines from "./NewRoutinesPage";
import RoutineView from "./RoutineView";
import RoboProfileList from "./RobotProfileList";
import Welcome from "./Welcome";
import RobotProfile from "./NewRobotProfile";
import ViewRobotProfile from "./ManageRobotProfile";

class MainPage extends Component {
  state = {
    RoutinesList: [
      {
        name: "Pick and Place 1",
        points: [
          { x: 3, y: 5, z: 3 },
          { x: 3, y: 8, z: 0 },
        ],
        capturedBy: "Moazzam",
      },
      {
        name: "Pick and Place 1",
        points: [
          { x: 3, y: 5, z: 3 },
          { x: 3, y: 8, z: 0 },
        ],
        capturedBy: "A. Moazzam",
      },
      {
        name: "Pick and Place 1",
        points: [
          { x: 3, y: 5, z: 3 },
          { x: 3, y: 8, z: 0 },
        ],
        capturedBy: "Abdul Moazzam",
      },
      {
        name: "Pick and Place 1",
        points: [
          { x: 3, y: 5, z: 3 },
          { x: 3, y: 8, z: 0 },
        ],
        capturedBy: "Adeel",
      },
    ],
    robotProfileListData: [
      { name: "UR10", routine: "Pick and Place 1" },
      { name: "UR5", routine: "Pick and Place 2" },
      { name: "UR3", routine: "Pick and Place 3" },
      { name: "UR10", routine: "Pick and Place 1" },
      { name: "UR5", routine: "Pick and Place 2" },
      { name: "UR3", routine: "Pick and Place 3" },
      { name: "UR10", routine: "Pick and Place 1" },
      { name: "UR5", routine: "Pick and Place 2" },
      { name: "UR3", routine: "Pick and Place 3" },
      { name: "UR10", routine: "Pick and Place 1" },
      { name: "UR5", routine: "Pick and Place 2" },
      { name: "UR3", routine: "Pick and Place 3" },
      { name: "UR10", routine: "Pick and Place 1" },
      { name: "UR5", routine: "Pick and Place 2" },
      { name: "UR3", routine: "Pick and Place 3" },
      { name: "UR10", routine: "Pick and Place 1" },
      { name: "UR5", routine: "Pick and Place 2" },
      { name: "UR3", routine: "Pick and Place 3" },
      { name: "UR10", routine: "Pick and Place 1" },
      { name: "UR5", routine: "Pick and Place 2" },
      { name: "UR3", routine: "Pick and Place 3" },
      { name: "UR10", routine: "Pick and Place 1" },
      { name: "UR5", routine: "Pick and Place 2" },
      { name: "UR3", routine: "Pick and Place 3" },
      { name: "UR10", routine: "Pick and Place 1" },
      { name: "UR5", routine: "Pick and Place 2" },
      { name: "UR3", routine: "Pick and Place 3" },
    ],
  };

  componentDidMount() {
    // $("#menu-toggle").onclick(function(e) {
    //   e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    // });
  }

  render() {
    return (
      <Router>
        <div
          class="container-fluid"
          style={{
            backgroundImage: `url("/Images/UR.jpg")`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1200px 800px",
          }}
        >
          <div class="row min-vh-100 flex-column flex-md-row">
            <aside class="col-12 col-md-2 p-0 bg-dark flex-shrink-1">
              <nav class="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start py-2">
                <div class="collapse navbar-collapse ">
                  <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                    <li class="nav-item">
                      <Link to="WelcomePage" class="nav-link pl-0 text-nowrap">
                        <i class="fa fa-bullseye fa-fw"></i>
                        <span class="font-weight-bold">
                          Learning Management System (LMS)
                        </span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="RoboProfileList" class="nav-link pl-0">
                        <i class="fa fa-book fa-fw"></i>{" "}
                        <span class="d-none d-md-inline">
                          View Robot Profiles
                        </span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link pl-0" to="NewRobotProfile">
                        <i class="fa fa-cog fa-fw"></i>
                        <span class="d-none d-md-inline">
                          Add Robot Profile
                        </span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link pl-0" to="ManageRobotProfile">
                        <i class="fa fa-heart codeply fa-fw"></i>
                        <span class="d-none d-md-inline">
                          Manage Robot Profile
                        </span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="WelcomePage" class="nav-link pl-0 text-nowrap">
                        <i class="fa fa-bullseye fa-fw"></i>{" "}
                        <span class="font-weight-bold">
                          Robot Learning Management System <wbr /> (RLMS)
                        </span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        to="LoadRoutinesPage"
                        class="nav-link pl-0"
                        href="#"
                      >
                        <i class="fa fa-book fa-fw"></i>{" "}
                        <span class="d-none d-md-inline">Load Routines</span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="NewRoutinesPage" class="nav-link pl-0" href="#">
                        <i class="fa fa-cog fa-fw"></i>
                        <span class="d-none d-md-inline">New Routine</span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        to="ManageRoutinesPage"
                        class="nav-link pl-0"
                        href="#"
                      >
                        <i class="fa fa-heart codeply fa-fw"></i>{" "}
                        <span class="d-none d-md-inline">Manage Routines</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </aside>
            <main class="col bg-faded py-3 flex-grow-1">
              <Route path="/" exact component={Welcome} />
              <Route path="/WelcomePage" exact component={Welcome} />
              <Route
                path="/LoadRoutinesPage"
                exact
                component={() => (
                  <LoadRoutines routines={this.state.RoutinesList} />
                )}
              />
              <Route path="/NewRoutinesPage" exact component={NewRoutines} />
              <Route
                path="/ManageRoutinesPage"
                exact
                component={() => (
                  <ManageRoutines routines={this.state.RoutinesList} />
                )}
              />
              <Route path="/NewRobotProfile" exact component={RobotProfile} />
              <Route
                path="/RoboProfileList"
                exact
                component={() => (
                  <RoboProfileList
                    ProfileData={this.state.robotProfileListData}
                  />
                )}
              />
              <Route
                path="/ManageRobotProfile"
                exact
                component={() => (
                  <ViewRobotProfile
                    RobotProfileData={this.state.robotProfileListData}
                  />
                )}
              />
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

export default MainPage;
