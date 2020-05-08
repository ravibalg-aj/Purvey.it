import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  boxleft: {
    backgroundColor: "#365347",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#D8D8D8",
    fontFamily: "'Mrs Saint Delafield', cursive",
    textAlign: "center",
    fontSize:128,
  },
  tagline: {
    color: "#BA895C",
    fontSize: 26,
    fontFamily: "'Spectral SC', serif",
    textAlign: "center",
  },
}));
const LeftPane = () => {
  const classes = useStyles();

  return (
    <Box className={classes.boxleft}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.icon} variant="h6" gutterBottom>
            Purvey.it
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.tagline} variant="h6" gutterBottom>
            Lets Grow Together
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeftPane;
