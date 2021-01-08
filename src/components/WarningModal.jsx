import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Component } from 'react';



class WarningModal extends Component {
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
                    <DialogTitle id="alert-dialog-title">{"Warning !!!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.option.messege}
                        </DialogContentText>
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
export default WarningModal;
