import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";

import CSignUp from "./csignup";
import CSignIn from "./csignin";
import MerchBG from "../../../images/merchBG2.jpeg";

import { connect } from "react-redux";
import { logoutUser } from "../../../thunks/customer-thunk";
import { getCustomer } from "../../../selectors/customer-selector";

const isEmpty = require("is-empty");

const useStyles = makeStyles((theme) => ({
  root: {
    height: "60vh",
    width: "100vw",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundImage: `url(${MerchBG})`,
    backgroundSize: "cover",
    bacgroundPosition: "center",
    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.2)",
  },
  brandName: {
    marginLeft: theme.spacing(2),
    fontFamily: "'Titillium Web', sans-serif",
    fontSize: 24,
    letterSpacing: "4px",
    fontWeight: "100",
  },
  menubar: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    padding: theme.spacing(4),
  },
  menuicon: {
    fontSize: 24,
  },
  badge: {
    padding: "2px",
  },
  inoutButton: {
    fontFamily: "'Titillium Web', sans-serif",
    fontSize: 16,
    letterSpacing: "3px",
  },
}));

const MTopBar = ({ brandName, customer, onLogoutPressed }) => {
  const classes = useStyles();

  const [upOpen, setUpOpen] = useState(false);
  const [inOpen, setInOpen] = useState(false);

  const handleSignupOpen = () => {
    setUpOpen(true);
  };

  const handleSignupClose = () => {
    setUpOpen(false);
  };

  const handleSigninOpen = () => {
    setInOpen(true);
  };

  const handleSigninClose = () => {
    setInOpen(false);
  };

  const loginBox = (
    <Box pr={3}>
      <Button onClick={handleSigninOpen}>
        <Typography variant="subtitle1" className={classes.inoutButton}>
          Login{isEmpty(customer.data) ? "/Register" : ""}
        </Typography>
      </Button>
      <CSignUp
        open={upOpen}
        handleClose={handleSignupClose}
        handleSigninOpen={handleSigninOpen}
      />
      <CSignIn
        open={inOpen}
        handleClose={handleSigninClose}
        handleSignupOpen={handleSignupOpen}
      />
    </Box>
  );

  const logoutBox = (
    <Box pr={3}>
      <Button
        onClick={() => {
          onLogoutPressed();
          handleSignupClose();
          handleSigninClose();
        }}
      >
        <Typography variant="subtitle1" className={classes.inoutButton}>
          Logout{" "}
        </Typography>
      </Button>
    </Box>
  );

  return (
    <Box className={classes.root}>
      <Box className={classes.menubar}>
        <Box>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon className={classes.menuicon} />
          </IconButton>
        </Box>
        <Box flexGrow={1}>
          <Typography variant="subtitle1" className={classes.brandName}>
            {String(brandName).toUpperCase()}
          </Typography>
        </Box>
        {customer.isAuthenticated ? logoutBox : loginBox}
        <Box>
          <IconButton edge="end" color="inherit" aria-label="menu">
            <Badge
              badgeContent={99}
              color="default"
              max={9}
              className={classes.badge}
            >
              <img
                src="https://image.flaticon.com/icons/svg/1170/1170678.svg"
                width="24"
                height="24"
                alt="Shoppingcart icon"
              />
            </Badge>
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  customer: getCustomer(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogoutPressed: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MTopBar);
