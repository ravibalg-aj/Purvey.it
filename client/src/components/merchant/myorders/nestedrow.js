import React, { useState, useEffect } from "react";

import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

import lodash from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  cancelledorder: {
    "& > *": {
      borderBottom: "unset",
    },
    backgroundColor: "#00000066",
  },
  issuebox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NestedRow = ({ order, updateOrderStatus, raiseIssue }) => {
  //   const { order } = props;
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openProcessDialog, setOpenProcessDialog] = useState(false);
  const [openDeliverDialog, setOpenDeliverDialog] = useState(false);
  const [openIssueDialog, setOpenIssueDialog] = useState(false);

  const handleProcessDialogClose = () => {
    setOpenProcessDialog(false);
  };

  const handleDeliverDialogClose = () => {
    setOpenDeliverDialog(false);
  };

  const handleIssueDialogClose = () => {
    setOpenIssueDialog(false);
  };

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [issueMessage, setIssueMessage] = useState("");

  useEffect(() => {
    if (order.status === "ORDER_RECEIVED") {
      setChecked1(true);
      setChecked2(false);
      setChecked3(false);
    } else if (order.status === "ORDER_PROCESSING") {
      setChecked1(true);
      setChecked2(true);
      setChecked3(false);
    } else if (order.status === "ORDER_DELIVERED") {
      setChecked1(true);
      setChecked2(true);
      setChecked3(true);
    } else {
      setChecked1(false);
      setChecked2(false);
      setChecked3(false);
    }
  }, [order]);

  const handleChecked1 = () => {
    setChecked1(true);
  };
  const handleChecked2 = () => {
    // setChecked2(true);
    setOpenProcessDialog(true);
  };
  const handleChecked3 = () => {
    // setChecked3(true);
    setOpenDeliverDialog(true);
  };

  const handleNoOptionForProcess = () => {
    setChecked2(false);
    handleProcessDialogClose();
  };

  const handleYesOptionForProcess = (orderId) => {
    updateOrderStatus(orderId, 1);
    handleProcessDialogClose();
  };

  const handleNoOptionForDeliver = () => {
    setChecked3(false);
    handleDeliverDialogClose();
  };

  const handleYesOptionForDeliver = (orderId) => {
    updateOrderStatus(orderId, 2);
    handleDeliverDialogClose();
  };

  const handleIssueRaise = (orderId) => {
    raiseIssue(orderId, issueMessage);
    handleIssueDialogClose();
  };

  const classes = useStyles();

  const itemNameWithQuatity = [];

  const groupByNames = lodash.groupBy(order.cart, (products) => products.name);

  Object.keys(groupByNames).map((key) =>
    itemNameWithQuatity.push(
      <Box key={key}>{key + " - " + groupByNames[key].length}</Box>
    )
  );

  return (
    <React.Fragment>
      <TableRow
        className={
          order.status === "ORDER_CANCELLED"
            ? classes.cancelledorder
            : classes.root
        }
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenCollapse(!openCollapse)}
          >
            {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order._id}
        </TableCell>
        <TableCell align="center">
          <FormControlLabel
            disabled={
              order.status === "ORDER_CANCELLED" ? true : false || checked1
            }
            control={
              <Switch checked={checked1} onChange={() => handleChecked1()} />
            }
          />
        </TableCell>
        <TableCell align="center">
          {" "}
          <FormControlLabel
            disabled={
              order.status === "ORDER_CANCELLED" ? true : false || checked2
            }
            control={
              <Switch checked={checked2} onChange={() => handleChecked2()} />
            }
          />
        </TableCell>
        <TableCell align="center">
          {" "}
          <FormControlLabel
            disabled={
              order.status === "ORDER_CANCELLED" ? true : false || checked3
            }
            control={
              <Switch checked={checked3} onChange={() => handleChecked3()} />
            }
          />
        </TableCell>
        <TableCell align="center">
          <Box className={classes.issuebox}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenIssueDialog(true)}
              disabled ={ order.status === "ORDER_CANCELLED" ? true : false}
            >
              Raise Issue
            </Button>
            <Typography variant="caption">{order.issueMessage}</Typography>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow className={
          order.status === "ORDER_CANCELLED"
            ? classes.cancelledorder
            : classes.root
        }>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Items</TableCell>
                    <TableCell align="right">No of items</TableCell>
                    <TableCell align="right">Total price (₹)</TableCell>
                    <TableCell align="right">Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={order.createdAt}>
                    <TableCell component="th" scope="row">
                      {String(order.createdAt).substr(0, 10)}
                    </TableCell>
                    <TableCell>{order.from}</TableCell>
                    <TableCell align="right">
                      <Box>{itemNameWithQuatity}</Box>
                    </TableCell>
                    <TableCell align="right">{order.cart.length}</TableCell>
                    <TableCell align="right">{order.totalPrice}</TableCell>
                    <TableCell align="right">{order.shippingAddress}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Dialog
        open={openProcessDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleProcessDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title1">
          {"Are you sure to start processing this order ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description1">
            {
              "You cannot revert this option. So decide throughly and select YES to continue & NO to stop!"
            }
            <br></br>
            {order._id + " ( " + order.cart.length + " )"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNoOptionForProcess} color="primary">
            NO
          </Button>
          <Button
            onClick={() => handleYesOptionForProcess(order._id)}
            color="primary"
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDeliverDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeliverDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title2">
          {"Are you sure to deliver this order ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description2">
            {
              "You cannot revert this option. So decide throughly and select YES to continue & NO to stop!"
            }
            <br></br>
            {order._id + " ( " + order.cart.length + " )"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNoOptionForDeliver} color="primary">
            NO
          </Button>
          <Button
            onClick={() => handleYesOptionForDeliver(order._id)}
            color="primary"
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openIssueDialog}
        onClose={handleIssueDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Raise a Issue ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the below textbox with your issue, that issue message
            will be shown to the customer.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="issueMessage"
            label="Issue Message"
            type="text"
            variant="outlined"
            value={issueMessage}
            onChange={(e) => {
              setIssueMessage(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleIssueDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleIssueRaise(order._id)} color="primary">
            Raise it
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default NestedRow;
