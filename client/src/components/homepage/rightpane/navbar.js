import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(4),
  },
  buttonGroup: {
    textAlign: "center",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <Box className={classes.buttonGroup}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button size="large" className={classes.margin}>
          Home
        </Button>
      </Link>
      <Link to="/about" style={{ textDecoration: "none" }}>
        <Button size="large" className={classes.margin}>
          About
        </Button>
      </Link>
      <Link to="/contact" style={{ textDecoration: "none" }}>
        <Button size="large" className={classes.margin}>
          Contact
        </Button>
      </Link>
    </Box>
  );
};

export default Navbar;
