import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import LeftPane from "./leftpane";
import Rightpane from "./rightpane";

import { connect } from "react-redux";
import history from "../../utils/history";

import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "../../thunks/merchant-thunk";
import { getMerchant } from "../../selectors/merchant-selector";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    height: "100vh",
    width: "100vw",
    fontFamily: "'Roboto', sans-serif",
  },
}));

const Homepage = ({ mLogoutUser, mSetCurrentUser, merchant }) => {
  useEffect(() => {
    if (localStorage.mjwtToken) {
      // Set auth token header auth
      const token = localStorage.mjwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      console.log(decoded);
      // Set user and isAuthenticated
      mSetCurrentUser(decoded.id);
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        mLogoutUser();
        // Redirect to login
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (merchant.isAuthenticated) {
      history.push("./merchant");
    }
  }, [merchant]);

  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={6}>
        <LeftPane />
      </Grid>

      <Grid item xs={12} sm={6}>
        <Rightpane />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  merchant: getMerchant(state),
});

const mapDispatchToProps = (dispatch) => ({
  mLogoutUser: () => dispatch(logoutUser()),
  mSetCurrentUser: (id) => dispatch(setCurrentUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
