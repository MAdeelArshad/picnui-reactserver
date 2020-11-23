import React, { Component } from "react";
import Profile from "./Profile";
import { BrowserRouter as Router } from 'react-router-dom';


class Welcome extends Component{

    state = {

        profileData: [
            { url: '/Images/ProfileImages/BG.jpeg', name: 'Abdul Muazzam', data: 'SP17-BSE-033' },
            { url: '/Images/ProfileImages/BG.jpeg', name: 'Faizan Haider', data: 'SP17-BSE-108' },
            { url: '/Images/ProfileImages/BG.jpeg', name: 'Adeel Arshd', data: 'SP17-BSE-132' },
        ],

        SupervisorprofileData: [
            { url: '/Images/ProfileImages/BG.jpeg', name: 'Dr. Wajahat', data: 'Supervisor' },
            { url: '/Images/ProfileImages/BG.jpeg', name: 'Dr. Aksam', data: 'Co. Supervisor' },
        ]

    }

    render(){
    
        return (
            
            <Router>
                
                <div className='container-fluid'>
    
                    <h1>Programming Industrial Cobots Using Natural User Interactions (PICNUI)</h1>
                    <div className='row'>
                        <div className='col-6'>
                            <blockquote>Robot, any automatically operated machine that replaces human effort, though it may not resemble human beings in appearance or perform functions in a humanlike manner. By extension, robotics is the engineering discipline dealing with the design, construction, and operation of robots. </blockquote>
                        </div>
                        <div className='col-6'></div>
                    </div>
    
                    <div className='row'>
                        <div className='col-1'></div>
                        {this.state.profileData.map((p) => Profile(p))}
                        <div className='col-1'></div>
                    </div>
                    <br />
                    <div className='row'>
                        <div className='col-2'></div>
                        {this.state.SupervisorprofileData.map((p) => Profile(p))}
                        <div className='col-2'></div>
                    </div>




                </div>);
                


               
                    

            </Router>
        );

    }

}

export default Welcome
