import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  errorBox: {
    border: "2px solid #365347",
  },
}));

const Error = ({ mMsg, cMsg }) => {
  const classes = useStyles();

  const mError = (msg) => (
    <Box className={classes.errorBox}>
      <b>{msg.message}</b>
      <Box>{msg.stack}</Box>
    </Box>
  );

  const cError = (msg) => (
    <Box className={classes.errorBox}>
      <b>{msg.message}</b>
      <Box>{msg.stack}</Box>
    </Box>
  );

  return (
    <Box className={classes.root}>
      Hello im Error box...<br></br> Just Refresh and See.
      {mMsg ? mError(mMsg) : null}
      {cMsg ? cError(cMsg) : ""}
    </Box>
  );
};

export default Error;
