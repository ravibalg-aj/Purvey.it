import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import LeftPane from "./leftpane";
import Rightpane from "./rightpane";

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

const Homepage = () => {
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

export default Homepage;
