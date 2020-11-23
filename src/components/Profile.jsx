import React, { Component } from "react";



const Profile = (props) => {

return <div className='col'>
    
    <div class="card">
  <div class="card-header">

  <center> <img src={window.location.origin + props.url} width='200px' height='200px' /> </center>
  </div>
  <div class="card-body">{props.name}</div>
  <div class="card-footer">{props.data}</div>
</div>
            

</div>

}


export default Profile