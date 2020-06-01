import React, { useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import { getProductView } from "../../../selectors/customer-selector";
import {
  getSpecificProduct,
  logoutUser,
  setCurrentUser,
} from "../../../thunks/customer-thunk";
import {
  getCustomerData,
  getCustomer,
  getMerchantData,
} from "../../../selectors/customer-selector";

import CTopPane from "../../customer/homepage/toppane/ctoppane";
import CBottomBar from "../../customer/homepage/cbottombar";
import Loading from "../../utils/loading";
import Error from "../../utils/error";
import LeftPane from "./leftpane";
import RightPane from "./rightpane";
import setAuthToken from "../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

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
  breadcrumb: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  body: {
    display: "flex",
    flexDirection: "row",
  },
}));

const ProductView = ({
  match,
  product,
  getProduct,
  onAddButtonPressed,
  customer,
  customerData,
  clogoutUser,
  csetCurrentUser,
  merchantData,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getProduct(match.params.id, match.params.productid);
    if (isEmpty(customerData)) {
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
                <Link
                  color="inherit"
                  href={`/m/shop/${match.params.id}`}
                  // onClick={handleClick}
                >
                  Shop
                </Link>
                <Typography color="textPrimary">{product.name}</Typography>
              </Breadcrumbs>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box className={classes.body}>
              <LeftPane product={product} />
              <RightPane product={product} />
            </Box>
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
      ) : isEmpty(product) ? (
        <Error />
      ) : (
        content
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: getProductView(state),
  customer: getCustomer(state),
  customerData: getCustomerData(state),
  merchantData: getMerchantData(state),
});

const mapDispatchToProps = (dispatch) => ({
  getProduct: (brandName, productid) =>
    dispatch(getSpecificProduct(brandName, productid)),
  clogoutUser: () => dispatch(logoutUser()),
  csetCurrentUser: (id) => dispatch(setCurrentUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);
