import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CTopPane from "./toppane/ctoppane";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import Loading from "../../utils/loading";
import Error from "../../utils/error";

import { connect } from "react-redux";
import {
  loadMerchantData,
  logoutUser,
  setCurrentUser,
} from "../../../thunks/customer-thunk";

import CBottomBar from "./cbottombar";
import CPopularProducts from "./cpopularproducts";
import COurStory from "./courstory";
import {
  getMerchantData,
  getCustomer,
  getCustomerData,
  getMerchantProducts,
} from "../../../selectors/customer-selector";

import setAuthToken from "../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
const isEmpty = require("is-empty");

const useStyles = makeStyles((theme) => ({
  homeBox: {
    height: "100%",
    backgroundColor: "#ffffff",
    fontFamily: "'Titillium Web', sans-serif",
  },
  firstphrase: {
    height: "30vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    letterSpacing: "2px",
    fontFamily: "'Caveat', cursive;",
  },
  noproducts: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border:"1px solid #365347"
  },
}));

//let content = "Balg";
const CHomepage = ({
  match,
  merchantData,
  runOnLoad,
  customer,
  clogoutUser,
  csetCurrentUser,
  customerData,
  products,
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
        if(decoded.brandName === match.params.id){
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
    <Box>
      <Grid container className={classes.homeBox}>
        <Grid item xs={12} className={classes.topPane}>
          <CTopPane
            brandName={!isEmpty(merchantData) ? merchantData.brandName : ""}
            customProps={{ height: "60vh" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" className={classes.firstphrase}>
            Feel the <b>Quality</b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {!isEmpty(products) ? (
            <CPopularProducts />
          ) : (
            <Box className={classes.noproducts}>
              <Typography variant="h5">
                {"In demand prodcuts will be displayed here!"}
                <br></br>
                {"Merchant have not uploaded the products Yet!"}
                <br></br>
                {"Comeback soon to view our products!"}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          <COurStory />
        </Grid>
        <Grid item xs={12}>
          <CBottomBar />
        </Grid>
      </Grid>
    </Box>
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
  products: getMerchantProducts(state),
});

const mapDispatchToProps = (dispatch) => ({
  runOnLoad: (brandName) => dispatch(loadMerchantData(brandName)),
  clogoutUser: () => dispatch(logoutUser()),
  csetCurrentUser: (id) => dispatch(setCurrentUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CHomepage);
