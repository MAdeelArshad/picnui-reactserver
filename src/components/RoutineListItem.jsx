import React, { Component } from 'react'


const RoutineListItem = props => {
    return (
            
        <div class="card">
            <div class="card-header">
                <div class="row">
                
                    <div class="col-md-4"> {props.routine.name} </div>
                    <div class="col-md-5">  </div>
                    <div class="col-md-1">
                        <button class="btn btn-info">View</button> </div>
                    <div class="col-md-1">
                        <button class="btn btn-info">Edit</button> </div>
                    <div class="col-md-1">
                        <button class="btn btn-danger">Delete</button> </div>

                </div>
                
            </div>
        </div>
    );
}

export default RoutineListItem