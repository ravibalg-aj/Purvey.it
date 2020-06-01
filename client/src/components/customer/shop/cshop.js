import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import CTopPane from "../homepage/toppane/ctoppane";
import CBottomPane from "./cbottompane";
import CBottomBar from "../homepage/cbottombar";
import {
  loadMerchantData,
  logoutUser,
  setCurrentUser,
} from "../../../thunks/customer-thunk";
import {
  getMerchantData,
  getCustomer,
  getCustomerData,
} from "../../../selectors/customer-selector";

import setAuthToken from "../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import Loading from "../../utils/loading";
import Error from "../../utils/error";

const isEmpty = require("is-empty");

const useStyles = makeStyles((theme) => ({
  firstphrase: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    letterSpacing: "2px",
  },
  breadcrumb: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
}));

const CShop = ({
  match,
  runOnLoad,
  clogoutUser,
  csetCurrentUser,
  customer,
  merchantData,
  customerData,
}) => {
  useEffect(() => {
    if (isEmpty(merchantData)) {
      runOnLoad(match.params.id);
    }
    if (isEmpty(customerData)) {
      // Check for token to keep user logged in
      if (localStorage.cjwtToken) {
        // Set auth token header auth
        const token = localStorage.cjwtToken;
        setAuthToken(token);
        // Decode token and get user info and exp
        const decoded = jwt_decode(token);
        console.log(decoded);
        // Set user and isAuthenticated
        if (decoded.brandName === match.params.id) {
          csetCurrentUser(decoded.id);
          // Check for expired token
          const currentTime = Date.now() / 1000; // to get in milliseconds
          if (decoded.exp < currentTime) {
            // Logout user
            clogoutUser();
            // Redirect to login
          }
        }
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = useStyles();

  const content = (
    <Grid container>
      <Grid item xs={12}>
        <CTopPane
          brandName={match.params.id}
          customProps={{ height: "11vh", bg: "none" }}
        />
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.breadcrumb}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link
              color="inherit"
              href={`/m/${match.params.id}`}
              // onClick={handleClick}
            >
              Home
            </Link>
            <Typography color="textPrimary">Shop</Typography>
          </Breadcrumbs>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.firstphrase}>
          <Typography variant="h5">
            {"Here's our complete list of Products!"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <CBottomPane />
      </Grid>
      <Grid item xs={12}>
        <CBottomBar />
      </Grid>
    </Grid>
  );
  return (
    <div>
      {customer.isLoading ? (
        <Loading />
      ) : isEmpty(merchantData) ? (
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
  customerData: getCustomerData(state),
});

const mapDispatchToProps = (dispatch) => ({
  runOnLoad: (brandName) => dispatch(loadMerchantData(brandName)),
  clogoutUser: () => dispatch(logoutUser()),
  csetCurrentUser: (id) => dispatch(setCurrentUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CShop);
