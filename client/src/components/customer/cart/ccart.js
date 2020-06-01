import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import CTopPane from "../homepage/toppane/ctoppane";
import CBottomBar from "../homepage/cbottombar";
import CListTable from "./clisttable";
import {
  loadMerchantData,
  logoutUser,
  setCurrentUser,
} from "../../../thunks/customer-thunk";
import {
  getMerchantData,
  getCustomer,
  getCart,
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
    marginBottom: theme.spacing(2),
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
  tableheading: {
    marginTop: theme.spacing(3),
  },
  gpaybutton: {
    padding: theme.spacing(2),
  },
}));

const CCart = ({
  match,
  runOnLoad,
  clogoutUser,
  csetCurrentUser,
  customer,
  merchantData,
  customerCart,
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
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Grid container>
          <Grid item xs={12}>
            <CTopPane
              brandName={match.params.id}
              customProps={{ height: "11vh", bg: "none" }}
            />
          </Grid>
          {!isEmpty(customerCart) ? (
            <Grid item xs={12}>
              <Box className={classes.firstphrase}>
                <Typography variant="h6">
                  {"Hooray! Just a click and will be delivered ASAP!"}
                </Typography>
              </Box>
            </Grid>
          ) : (
            ""
          )}
          <Grid item xs={12}>
            {customer.isAuthenticated ? (
              isEmpty(customerCart) ? (
                <Box className={classes.firstphrase}>
                  <Typography variant="h6">
                    {"Oops your cart is empty! Go for shopping!"}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Box pl={2} className={classes.tableheading}>
                    <Typography variant="h5">{"SHOPPING CART"}</Typography>
                  </Box>

                  <CListTable cart={customerCart} />
                </Box>
              )
            ) : (
              <Box className={classes.firstphrase}>
                <Typography variant="h6">
                  {"Login to view your cart!"}
                </Typography>
              </Box>
            )}
          </Grid>
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
  customerData: getCustomerData(state),
});

const mapDispatchToProps = (dispatch) => ({
  runOnLoad: (brandName) => dispatch(loadMerchantData(brandName)),
  clogoutUser: () => dispatch(logoutUser()),
  csetCurrentUser: (id) => dispatch(setCurrentUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CCart);
