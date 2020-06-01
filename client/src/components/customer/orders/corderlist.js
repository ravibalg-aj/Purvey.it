import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import lodash from "lodash";
import { Icon } from "@material-ui/core";

const isEmpty = require("is-empty");
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  expansionpanelsummary: {
  },
  panelSummary: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  panelDetails: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  toppane: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  bottompane: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  orderid: {
    flexGrow: 1,
  },
  orderdate: {
    flexGrow: 1,
  },
  orderitemscount: {
    flexGrow: 1,
  },
  cancelledexpansionpanel: {
    // backgroundColor: "#00000066",
    background:"repeating-linear-gradient( 120deg,#fff,#fff 20px,#00000011 20px,#00000011 40px)"
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const COrderList = ({ orders, order, onCancelButtonClick }) => {
  const classes = useStyles();

  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const handleCancelDialogClose = () => {
    setOpenCancelDialog(false);
  };

  const handleNoOptionForCancel = () => {
    handleCancelDialogClose();
  };

  const handleYesOptionForCancel = (orderId) => {
    onCancelButtonClick(orderId, 3);
    handleCancelDialogClose();
  };
  // const groupByNames = lodash.groupBy(order.cart, (products) => products.name);

  // Object.keys(groupByNames).map((key) =>
  //   itemNameWithQuatity.push(
  //     <Box key={key}>{key + " - " + groupByNames[key].length}</Box>
  //   )
  // );

  return (
    <Box className={classes.root}>
      {/* {orders.map((order) => ( */}
      <ExpansionPanel
        className={
          order.status === "ORDER_CANCELLED"
            ? classes.cancelledexpansionpanel
            : ""
        }
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.expansionpanelsummary}
        >
          <Box className={classes.panelSummary}>
            {order.status === "ORDER_RECEIVED" ? (
              <Box mr={4} className={classes.cancelbutton}>
                <IconButton
                  onClick={() => {
                    setOpenCancelDialog(true);
                  }}
                >
                  <HighlightOffIcon />
                </IconButton>
              </Box>
            ) : (
              " "
            )}
            <Box className={classes.orderid}>
              <Typography className={classes.heading}>
                Order ID ~ {order._id}
              </Typography>
            </Box>
            <Box className={classes.status}>
              <Typography className={classes.heading}>
                Status : {order.status}
              </Typography>
            </Box>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Box className={classes.panelDetails}>
            <Box className={classes.toppane} p={1}>
              <Box className={classes.orderdate}>
                <Typography className={classes.heading} p={1}>
                  Dated : {String(order.createdAt).substr(0, 10)}
                </Typography>
              </Box>
              <Box className={classes.orderitemscount} p={1}>
                <Typography className={classes.heading}>
                  No of Items : {order.cart.length}
                </Typography>
              </Box>
              <Box className={classes.ordertotalprice} p={1}>
                <Typography className={classes.heading}>
                  Price : {order.totalPrice}
                </Typography>
              </Box>
            </Box>
            <Box className={classes.bottompane}>
              <Box p={1}>
                <Typography className={classes.heading}>
                  Product List :{" "}
                  {Object.keys(
                    lodash.groupBy(order.cart, (products) => products.name)
                  ).map((key) => {
                    const groupByName = lodash.groupBy(
                      order.cart,
                      (products) => products.name
                    );
                    return key + " (" + groupByName[key].length + "), ";
                  })}
                </Typography>
              </Box>
              <Box p={1}>
                <Typography className={classes.heading}>
                  IssueMessage :{" "}
                  {!isEmpty(order.issueMessage) &&
                  String(order.issueMessage).length > 0
                    ? order.issueMessage
                    : "No issues!"}
                </Typography>
              </Box>
            </Box>
            <Dialog
              open={openCancelDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCancelDialogClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title2">
                {"Are you sure to cancel this order ?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description2">
                  {"Once the order goes processing you cannot cancel. " +
                    "You cannot revert this option. So decide throughly and select YES to continue & NO to abort!"}
                  <br></br>
                  {order._id + " ( " + order.cart.length + " )"}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleNoOptionForCancel} color="primary">
                  NO
                </Button>
                <Button
                  onClick={() => handleYesOptionForCancel(order._id)}
                  color="primary"
                >
                  YES
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {/* ))} */}
    </Box>
  );
};

export default COrderList;
