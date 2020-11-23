
import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Link } from 'react-router-dom';
import LoadRoutines from './LoadRoutinesPage';
import ManageRoutines from './ManageRoutinesPage';
import NewRoutines from './NewRoutinesPage';
import RoutineView from './RoutineView';
import Welcome from './Welcome';



class MainPage extends Component{


  state = {

    RoutinesList: [
      { name: 'UR3', points: [{ x: 3, y: 5, z: 3 }, { x: 3, y: 8, z: 0 }], capturedBy: 'Moazzam' },
      { name: 'UR5', points: [{ x: 3, y: 5, z: 3 }, { x: 3, y: 8, z: 0 }], capturedBy: 'A. Moazzam' },
      { name: 'UR10', points: [{ x: 3, y: 5, z: 3 }, { x: 3, y: 8, z: 0 }], capturedBy: 'Abdul Moazzam' },
      { name: 'UR3', points: [{ x: 3, y: 5, z: 3 }, { x: 3, y: 8, z: 0 }], capturedBy: 'Adeel' },
    ]

}


  componentDidMount() {
    // $("#menu-toggle").onclick(function(e) {
    //   e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    // });
  
}

    render() {
        
      return (
        <Router>

<div class="container-fluid">
    <div class="row min-vh-100 flex-column flex-md-row">
        <aside class="col-12 col-md-2 p-0 bg-dark flex-shrink-1">
            <nav class="navbar navbar-expand navbar-dark bg-dark flex-md-column flex-row align-items-start py-2">
                <div class="collapse navbar-collapse ">
                    <ul class="flex-md-column flex-row navbar-nav w-100 justify-content-between">
                        <li class="nav-item">
                            <Link to='WelcomePage' class="nav-link pl-0 text-nowrap" href="#"><i class="fa fa-bullseye fa-fw"></i> <span class="font-weight-bold">Learning Management System (LMS)</span></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link pl-0" href="#"><i class="fa fa-book fa-fw"></i> <span class="d-none d-md-inline">Robots</span></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link pl-0" href="#"><i class="fa fa-cog fa-fw"></i> <span class="d-none d-md-inline">Routines</span></Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link pl-0" href="#"><i class="fa fa-heart codeply fa-fw"></i> <span class="d-none d-md-inline">Mappings</span></Link>
                        </li>
                        <li class="nav-item">
                            <Link to='WelcomePage' class="nav-link pl-0 text-nowrap" ><i class="fa fa-bullseye fa-fw"></i> <span class="font-weight-bold">Robot Learning Management System (RLMS)</span></Link>
                        </li>
                        <li class="nav-item">
                            <Link to='LoadRoutinesPage' class="nav-link pl-0" href="#"><i class="fa fa-book fa-fw"></i> <span class="d-none d-md-inline">Load Routines</span></Link>
                        </li>
                        <li class="nav-item">
                            <Link to='NewRoutinesPage' class="nav-link pl-0" href="#"><i class="fa fa-cog fa-fw"></i> <span class="d-none d-md-inline">New Routine</span></Link>
                        </li>
                        <li class="nav-item">
                            <Link to='ManageRoutinesPage' class="nav-link pl-0" href="#"><i class="fa fa-heart codeply fa-fw"></i> <span class="d-none d-md-inline">Manage Routines</span></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>
        <main class="col bg-faded py-3 flex-grow-1">
            <Route path='/' exact component={Welcome} />
                  <Route path='/WelcomePage' exact component={Welcome} />
                  <Route path='/LoadRoutinesPage' exact component={() => <LoadRoutines routines={this.state.RoutinesList} />} />
                  <Route path='/NewRoutinesPage' exact component={NewRoutines} />
                  <Route path='/ManageRoutinesPage' exact component={() => <ManageRoutines routines={this.state.RoutinesList} />} />
        </main>
    </div>
          </div>
          
          </Router>
      );

    }


}

export default MainPage