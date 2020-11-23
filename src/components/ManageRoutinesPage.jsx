import React, { Component } from 'react';
import RoutineListItem from './RoutineListItem';

export default class ManageRoutines extends Component{


    routines = this.props.routines;

    render() {
    
        return (
            <div>

<h1> Manage Routines: </h1>


 <div class="col overflow-hidden">



{this.routines.map((r) => <RoutineListItem routine={r} />)}



 </div> 

<br />



</div> 




        );

}



}
