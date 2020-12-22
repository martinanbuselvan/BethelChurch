import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { unmountComponentAtNode } from "react-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import ReactDOM from 'react-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    padd: {
        padding: 10
    }
}));
const axios = require('axios');
class AddMember extends React.Component {
    //export default function AddMember(props) {
    constructor(props) {
        super(props);
        this.state = {
            cardNumber: "",
            memberName: "",
            mobileNumber: "",
            address: "",
            pincode: ""
        }
    }


    // componentDidUpdate(props, prevState) {
    //     if (this.props.selectedRow != props.selectedRow) {
    //         this.setState({
    //             cardNumber: props.selectedRow != undefined ? props.selectedRow.cardNumber : this.state.cardNumber,
    //             memberName: props.selectedRow != undefined ? props.selectedRow.name : this.state.memberName,
    //             mobileNumber: props.selectedRow != undefined ? props.selectedRow.mobileNumber : this.state.mobileNumber,
    //             address: props.selectedRow != undefined ? props.selectedRow.address :this. state.address,
    //             pincode: props.selectedRow != undefined ? props.selectedRow.pincode : this.state.pincode
    //         });
    //     }
    // }
    componentWillReceiveProps(props)
    {
        if (this.props.selectedRow != props.selectedRow) {
            this.setState({
                cardNumber: props.selectedRow != undefined ? props.selectedRow.cardNumber : this.state.cardNumber,
                memberName: props.selectedRow != undefined ? props.selectedRow.name : this.state.memberName,
                mobileNumber: props.selectedRow != undefined ? props.selectedRow.mobileNumber : this.state.mobileNumber,
                address: props.selectedRow != undefined ? props.selectedRow.address :this. state.address,
                pincode: props.selectedRow != undefined ? props.selectedRow.pincode : this.state.pincode
            });
        }
        // else {
        //     this.setState({
        //                 cardNumber: this.state.cardNumber,
        //                 memberName: this.state.memberName,
        //                 mobileNumber: this.state.memberName,
        //                 address:this. state.address,
        //                 pincode: this.state.pincode
        //             });
        //         }
    }

    // UNSAFE_componentWillReceiveProps()
    // {
    //     console.log("UNSAFE_componentWillReceiveProps");
    // }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.selectedRow) {

    //         return {

    //             cardNumber: props.selectedRow != undefined ? props.selectedRow.cardNumber : state.cardNumber,
    //             memberName: props.selectedRow != undefined ? props.selectedRow.name : state.memberName,
    //             mobileNumber: props.selectedRow != undefined ? props.selectedRow.mobileNumber : state.mobileNumber,
    //             address: props.selectedRow != undefined ? props.selectedRow.address : state.address,
    //             pincode: props.selectedRow != undefined ? props.selectedRow.pincode : state.pincode
    //         };

    //     }
    //     else {
    //         return {
    //             cardNumber: state.cardNumber,
    //             memberName: state.memberName,
    //             mobileNumber: state.memberName,
    //             address: state.address,
    //             pincode: state.pincode
    //         }
    //     }
    // }

    handleAddMember = (event) => {
        var bodyFormData = new FormData();
        bodyFormData.append('id', this.props.selectedRow.id);
        bodyFormData.append('CardNumber', this.state.cardNumber);
        bodyFormData.append('Name', this.state.memberName);
        bodyFormData.append('Address', this.state.address);
        bodyFormData.append('MobileNumber', this.state.mobileNumber);
        bodyFormData.append('Pincode', this.state.pincode);

        axios({
            method: 'post',
            url: 'https://localhost:44352/api/Member',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data',  'Access-Control-Allow-Origin':'*','accept':'*/*'}
        })
            .then(function (response) {
                //handle success
                console.log(response);
               
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        // this.setState({
        //     cardNumber: undefined,
        //     memberName: undefined,
        //     mobileNumber: undefined,
        //     address: undefined,
        //     pincode: undefined
        // });
        // unmountComponentAtNode(document.getElementById('root'));
        this.props.handleClose();
    }
    handleClose = () => {
        // this.setState({
        //     cardNumber: undefined,
        //     memberName: undefined,
        //     mobileNumber: undefined,
        //     address: undefined,
        //     pincode: undefined
        // });
        // unmountComponentAtNode(document.getElementById('root'));
        this.props.handleClose();
    }
    handlePincodeChange = (eve) => {
        this.setState({ pincode: eve.target.value });
    }
    handleMobNumberChange = (eve) => {
        this.setState({ mobileNumber: eve.target.value });
    }
    handleMemberNameChange = (eve) => {
        this.setState({ memberName: eve.target.value });
    }
    handleCardNumberChange = (eve) => {
        this.setState({ cardNumber: eve.target.value });
    }
    handleAddressChange = (eve) => {
        this.setState({ address: eve.target.value });
    }
    render() {
        //const handleClose = this.props.handleClose;

        const { classes } = this.props;
        const { cardNumber,
            memberName,
            mobileNumber,
            address,
            pincode } = this.state;
        return (
            <div>
                <DialogTitle id="form-dialog-title">Add Members</DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center">
                        <TextField className={classes.padd} onChange={this.handleCardNumberChange} value={cardNumber} required id="standard-required" label="Card Number" defaultValue="Card Number" />
                        <TextField className={classes.padd} onChange={this.handleMemberNameChange} value={memberName} required id="standard-required" label="Member Name" defaultValue="Member Name" />
                        <TextField
                            className={classes.padd}
                            onChange={this.handleMobNumberChange}
                            id="standard-number"
                            label="Mobile Number"
                            type="number"
                            value={mobileNumber}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            className={classes.padd}
                            required
                            onChange={this.handleAddressChange}
                            value={address}
                            id="filled-required"
                            label="Address"
                            defaultValue="Address"
                        />
                        <TextField
                            required
                            value={pincode}
                            onChange={this.handlePincodeChange}
                            className={classes.padd}
                            id="filled-required"
                            label="PinCode"
                            defaultValue="000000"
                        />
                    </Grid></DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={this.handleAddMember} color="primary">
                        Add
          </Button>
                </DialogActions></div>
        );
    }
}


export default withStyles(useStyles)(AddMember);
