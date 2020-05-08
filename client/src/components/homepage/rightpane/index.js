import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Route } from "react-router-dom";

import Navbar from "./navbar";
import Home from "./home";
import About from "./about"
import Contact from "./contact"
import SignUp from "./signup"
import SignIn from "./signin"



const useStyles = makeStyles((theme) => ({
    
  rightgrid: {
      height:"100%",
    backgroundColor: "#F1F1F1",
  },
}));
const RigthPane = ({match}) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      className={classes.rightgrid}
      
    >
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid item xs={12}>
      {/* {if(match.params.id)} */}
      <Route exact path="/" component={Home}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/signup" component={SignUp}/>
      <Route exact path="/signin" component={SignIn}/>
      </Grid>
    </Grid>
  );
};

export default RigthPane;
