import React, { useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import {
  getOrders,
  updateOrderStatus,
  raiseOrderIssue,
} from "../../../thunks/merchant-thunk";
import {
  getOrderDetails,
  getMerchantData,
} from "../../../selectors/merchant-selector";

import NestedRow from "./nestedrow";

const isEmpty = require("is-empty");

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
});

const MyOrders = ({
  orderDetails,
  merchantData,
  getOrdersOnLoad,
  onYesPressed,
  onRaiseIssuePressed,
}) => {
  useEffect(() => {
    console.log(merchantData._id);
    getOrdersOnLoad(merchantData._id);
  }, [merchantData]); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {isEmpty(orderDetails) ? (
        "No orders Found!"
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Order ID</TableCell>
                <TableCell align="center">Payment</TableCell>
                <TableCell align="center">Processing&nbsp;</TableCell>
                <TableCell align="center">Delivered&nbsp;</TableCell>
                <TableCell align="center">Issues&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetails
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((order) => (
                  <NestedRow
                    key={order._id}
                    order={order}
                    updateOrderStatus={onYesPressed}
                    raiseIssue={onRaiseIssuePressed}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  orderDetails: getOrderDetails(state),
  merchantData: getMerchantData(state),
});

const mapDispatchToProps = (dispatch) => ({
  getOrdersOnLoad: (merchantId) => dispatch(getOrders(merchantId)),
  onYesPressed: (orderId, status) =>
    dispatch(updateOrderStatus(orderId, status)),
  onRaiseIssuePressed: (orderId, issueMessage) =>
    dispatch(raiseOrderIssue(orderId, issueMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
