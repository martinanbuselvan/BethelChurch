import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import AddMember from './AddMember';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
//import { Alert, AlertTitle } from '@material-ui/lab';

const axios = require('axios');

const styles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(2),
        right: 'auto',
        bottom: 'auto',
    },
    fullWidth: { width: '100%' },
    container: {
        padding: theme.spacing(2),
        maxHeight: 440,

    },
    grow: {
        flexGrow: 1,
    },
    RightFix: {
        //  flexGrow: 1,
        //display: 'none',
        float: 'right'
    },
    Snackbar: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

class Members extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            page: 0,
            rowsPerPage: 5,
            rows: [],
            open: false,
            selectedRow: undefined
        }

        this.fetchData = this.fetchData.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    handleChangePage = (event, newPage) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: +event.target.value, page: 0 });
    };
    fetchData = () => {
        axios({
            method: 'get',
            url: 'https://localhost:44352/api/Member',

        })
            .then((response) => {
                //handle success
                console.log(response);
                this.setState
                    ({ rows: response.data });
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    handleAddClick = (event) => {
        // setOpen(true);
        let row = {
            cardNumber: "",
            name: "",
            mobileNumber: "",
            address: "",
            pincode: ""
        }
        this.setState({ open: true, selectedRow: row });
    };
    handleEditClick = (event) => {
        console.log(event);
        this.setState({ open: true, selectedRow: event, isEdit: true });
        //setOpen(true);
    };
    handleDeleteClick = (event) => {
        if (window.confirm('Are you sure you wish to delete this item?')) {

            var bodyFormData = new FormData();
            bodyFormData.append('id', event.id);
            bodyFormData.append('CardNumber', event.cardNumber);
            bodyFormData.append('Name', event.memberName);
            bodyFormData.append('Address', event.address);
            bodyFormData.append('MobileNumber', event.mobileNumber);
            bodyFormData.append('Pincode', event.pincode);

            axios({
                method: 'post',
                url: 'https://localhost:44352/api/Member/DeleteMember',
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(function (response) {
                    console.log(response);
                    this.fetchData();
                })
                .catch(function (response) {
                    console.log(response);
                });
        }
      

    };

    handleClose = () => {
        // setOpen(false);
        this.setState({ open: false });
        this.fetchData();
    };

    createTableRow = (content) => {
        let activityId = content.id;

        return (
            <TableRow key={activityId+"Row"}>
                {Object.keys(content).map((columnContent, i) => {

                    let width = 170;

                    return (
                        <TableCell style={{ width: { width } }} key={content[columnContent] + activityId} data-my-row-identifier={activityId} >{content[columnContent]}</TableCell>

                    );
                })}
                <TableCell >
                    <IconButton aria-label="edit" onClick={() => this.handleEditClick(content)}>
                        < EditIcon style={{ color: '#800000' }} />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => this.handleDeleteClick(content)}>
                        < DeleteIcon style={{ color: '#800000' }} />
                    </IconButton>
                </TableCell>
            </TableRow>
        );
    }

    render() {
        const { classes } = this.props;
        const { open, rows, rowsPerPage, page, selectedRow, sbopen, isEdit } = this.state;
        console.log(rows);
        console.log(rowsPerPage);
        console.log(page);
        if (rows.length < 1) {
            return null;
        }

        return (

            <Paper className={classes.root}>
                <div className={classes.RightFix}>
                    <IconButton aria-label="delete" onClick={this.handleAddClick}>
                        < AddCircleIcon style={{ color: '#800000' }} fontSize="large" />
                    </IconButton>
                </div>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {Object.keys(rows[0]).map((column) => (
                                    <TableCell className={classes.fullWidth}
                                        key={column.toUpperCase()}
                                        //   align={column.align}
                                        style={{ minWidth: '100%' }}
                                    >
                                        {column.toUpperCase()}
                                    </TableCell>
                                ))}
                                <TableCell >
                                    <Typography>Edit/Delete</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody >
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(this.createTableRow)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                <Dialog
                    key="Dialog"
                    open={open}
                    className={classes.fullWidth}
                    // TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <AddMember fetchData ={this.fetchData} selectedRow={selectedRow} isEdit={isEdit} handleClose={this.handleClose} />
                </Dialog>
            </Paper>



        );
    }
}

export default withStyles(styles)(Members);