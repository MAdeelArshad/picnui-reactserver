import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Component } from 'react';
import axios  from "axios";



class SimDialogBox extends Component {

    state = {
        webotsBtnDisabled: false,
        urSimBtnDisabled: false,
    }


    //   -------------  Handle Webots Btn  ---------------------

  handleWebotsSim = () => {
    console.log("Webots Btn Clicked");
    // console.log("points before going to the Webots: " + this.state.points.length)
    // console.log((this.state.points.length > 0 && this.state.RoutineName !== ""))


    let data = {
      RouitneName: this.props.option.messege.routineName,
      Points: this.props.option.messege.points,
    };
    if (this.props.option.messege.points.length > 0 && this.props.option.messege.routineName !== "") {
      axios
        .post(`http://127.0.0.1:8000/TriggerWebotsSim/`, data)
        .then((res) => {
          // this.setState({ points: [], image: "" });

          console.log(res.data);
          if (res.data.errorCheckStatus === true) {
            window.alert("ERROR MESSAGE: " + res.data.errorMessage);
          }
        })
        .catch((error) => {
          window.alert("ERROR MESSAGE: " + error);
        });
    } else {
      window.alert(
        "Either Routine Name is empty OR the points are not defined!"
      );
    }
  };

  //   -------------  Handle URSim Btn  ---------------------

  handleURSim = () => {
    console.log("URSim Btn Clicked");
    let data = {
        RouitneName: this.props.option.messege.routineName,
        Points: this.props.option.messege.points,
    };
    axios
      .post(`http://127.0.0.1:8000/TriggerURSim/`, data)
      .then((res) => {
        // this.setState({ points: [], image: "" });

        console.log(res.data);
        // window.alert("The Training Routine has been successfully Saved!");
      })
      .catch((error) => {
        console.log(error + "\n Duplicate Routine is not Allowed!");
        window.alert(error + "\n Duplicate Routine is not Allowed!");
      });
  };


    render() {
        console.log(this.props)
        return (
            <div>
                {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open alert dialog
                </Button> */}
                <Dialog
                    open={this.props.option.open}
                    onClose={this.props.option.onClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"><h2>Select Simulation</h2></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <b>Routine:  {this.props.option.messege.routineName}</b>
                        </DialogContentText>

                        
              <span>
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleWebotsSim()}
                  disabled={this.state.webotsBtnDisabled}
                >
                  Webots Simulation
                </button>
                &nbsp;&nbsp;
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleURSim()}
                  disabled={this.state.urSimBtnDisabled}
                >
                  UR Simulation
                </button>
              </span>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.option.onClose} color="primary">
                            Close
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default SimDialogBox;
