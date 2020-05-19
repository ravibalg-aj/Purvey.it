import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";

import CSignUp from "./csignup";
import CSignIn from "./csignin";
import MerchBG from "../../../../images/merchBG5.jpg";

import { connect } from "react-redux";
import { logoutUser } from "../../../../thunks/customer-thunk";
import { getCustomer } from "../../../../selectors/customer-selector";

const isEmpty = require("is-empty");

const useStyles = makeStyles((theme) => ({
  root: (customProps) => ({
    height: customProps.height,
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundImage: customProps.bg ? customProps.bg : `url(${MerchBG})`,
    backgroundSize: "cover",
    bacgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.2)",
  }),
  brandName: {
    fontFamily: "'Titillium Web', sans-serif",
    fontSize: 24,
    letterSpacing: "4px",
    fontWeight: "100",
  },
  menubar: {
    // position: "fixed",
    margin: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "inherit",
    // backgroundColor: "rgba(0, 0, 0, 0.1)",
    zIndex: "1",
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

const MTopBar = ({ brandName, customer, onLogoutPressed, customProps }) => {
  const classes = useStyles(customProps);

  const [upOpen, setUpOpen] = useState(false);
  const [inOpen, setInOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

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

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const loginBox = (
    <Box mr={2}>
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

  const helloText = (
    <Box mr={3}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(e) => handleProfileMenuOpen(e)}
      >
        <Typography variant="subtitle1" className={classes.inoutButton}>
          {"Hello " + customer.data.name + "!"}
        </Typography>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={profileMenuAnchor}
        keepMounted
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        mt={3}
        // anchorOrigin={{ vertical: "left", horizontal: "left" }}
        // transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
      <Link to={`/m/shop/${brandName}`} style={{ textDecoration: "none",color: "inherit" }}>
          <MenuItem onClick={handleProfileMenuClose}>Shop</MenuItem>
        </Link>
        <Link to={`/m/cart/${brandName}`} style={{ textDecoration: "none",color: "inherit" }}>
          <MenuItem onClick={handleProfileMenuClose}>Cart</MenuItem>
        </Link>
        <Link to={`/m/order/${brandName}`} style={{ textDecoration: "none",color: "inherit" }}>
          <MenuItem onClick={handleProfileMenuClose}>Orders</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            onLogoutPressed();
            handleSignupClose();
            handleSigninClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
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
        <Box flexGrow={1} ml={3}>
          <Link to={`/m/${brandName}`} style={{ textDecoration: "none" }}>
            <Button>
              <Typography variant="subtitle1" className={classes.brandName}>
                {String(brandName).toUpperCase()}
              </Typography>
            </Button>
          </Link>
        </Box>
        {/* <Box>{customer.isAuthenticated ? helloText : ""}</Box> */}
        <Box>{customer.isAuthenticated ? helloText : loginBox}</Box>
        <Box>
          <Link
            to={`/m/cart/${brandName}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <IconButton edge="end" color="inherit" aria-label="menu">
              <Badge
                badgeContent={
                  !isEmpty(customer.data) ? customer.data.cart.length : 0
                }
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
          </Link>
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
