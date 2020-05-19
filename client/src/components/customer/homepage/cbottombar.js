import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rootBox: {
    height: "25vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(4),
    backgroundColor: "#365347",
    fontSize:20,
    color:"#c4a78b",
    fontFamily: "'Titillium Web', sans-serif",

  },
}));

const CBottomBar = () => {
  const classes = useStyles();
  return (
    <Box className={classes.rootBox}>
      <Box display="flex" pb={3}>
        <Box flexGrow={1}><b>Vilvah</b></Box>
        <Box>Icons</Box>
      </Box>
      <Box>Krishnan Koil Street</Box>
      <Box>Salem, Tamil Nadu, India</Box>
      <Box>(+91) 95973 58189</Box>
      <Box pt={3}>Made with Purvey.it</Box>
    </Box>
  );
};

export default CBottomBar;
