import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import bg from "../../../images/mystoryBG.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  sidebar: {
    height: "inherit",
    backgroundColor: "#6b63ffdd",
    right: "0",
    width: "20%",
    position: "absolute",
  },
  sidebarimage: {
    position: "absolute",
    right: "2%",
    bottom: "10%",
    height: "450px",
    width: "450px",
  },
}));
const RightPane = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.sidebar}></Box>
      <Box>
        <img src={bg} className={classes.sidebarimage} alt="home-sidebar" />
      </Box>
    </Box>
  );
};

export default RightPane;
