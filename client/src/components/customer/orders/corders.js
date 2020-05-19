import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import CTopPane from "../homepage/toppane/ctoppane";
import COrderList from "./corderlist";
import CBottomBar from "../homepage/cbottombar";
import {
  loadMerchantData,
  logoutUser,
  setCurrentUser,
  loadOrderDetails,
} from "../../../thunks/customer-thunk";
import {
  getMerchantData,
  getCustomer,
  getCart,
  getOrderDetails,
  getCustomerData,
} from "../../../selectors/customer-selector";

import setAuthToken from "../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import Loading from "../../utils/loading";
import Error from "../../utils/error";

const isEmpty = require("is-empty");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  content: {
    flexGrow: 1,
    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.05)",

  },
  footer: {
    flexShrink: 0,
  },
  firstphrase: {
    height: "10vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    letterSpacing: "2px",
    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.05)",
    borderTop: "1px solid #365347",
  },
}));

const COrders = ({
  match,
  runOnLoad,
  clogoutUser,
  csetCurrentUser,
  customer,
  customerData,
  merchantData,
  customerCart,
  runOnLoadForOrder,
  orderDetails,
}) => {
  useEffect(() => {
    runOnLoad(match.params.id);
    // Check for token to keep user logged in
    if (localStorage.cjwtToken) {
      // Set auth token header auth
      const token = localStorage.cjwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      csetCurrentUser(decoded.id);
      runOnLoadForOrder(match.params.id, decoded.id);
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        clogoutUser();
        // Redirect to login
      }
    }
  }, []);

  const classes = useStyles();

  const content = (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Grid container>
          <Grid item xs={12}>
            <CTopPane
              brandName={match.params.id}
              customProps={{ height: "11vh", bg: "none" }}
            />
          </Grid>
          {!isEmpty(orderDetails) ? (
            <Grid item xs={12}>
              <Box className={classes.firstphrase}>
                <Typography variant="h6">{"ORDER DETAILS"}</Typography>
              </Box>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12}>
          <COrderList orders={orderDetails} />
        </Grid>
      </Box>
      <Box className={classes.footer}>
        <CBottomBar />
      </Box>
    </Box>
  );
  return (
    <div>
      {customer.isLoading ? (
        <Loading />
      ) : isEmpty(customer) ? (
        <Error />
      ) : (
        content
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  merchantData: getMerchantData(state),
  customer: getCustomer(state),
  customerCart: getCart(state),
  orderDetails: getOrderDetails(state),
  customerData: getCustomerData(state),
});

const mapDispatchToProps = (dispatch) => ({
  runOnLoad: (brandName) => dispatch(loadMerchantData(brandName)),
  clogoutUser: () => dispatch(logoutUser()),
  csetCurrentUser: (id) => dispatch(setCurrentUser(id)),
  runOnLoadForOrder: (merchantId, customerId) =>
    dispatch(loadOrderDetails(merchantId, customerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(COrders);
