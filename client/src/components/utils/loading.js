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
    justifyContent: 'center',

  },
}));

const Loading = () => {

    const classes = useStyles();
  return <Box className={classes.root}>Hello im loading box...</Box>;
};

export default Loading;
