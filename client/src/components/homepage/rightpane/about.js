import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";


const useStyles = makeStyles((theme) => ({
homeBox: {
    padding: theme.spacing(2),
  },
  contentTextWelcome: {
    color: "#BA895C",
    fontFamily: "'PT Serif', serif",
    padding: theme.spacing(3),
  },
  contentTextDesc: {
    fontFamily: "'PT Serif', serif",
    padding: theme.spacing(3),
    whitespace: "pre-wrap",
    fontSize: 20,
  },
}))

const About = () => {
    const classes = useStyles();
    return(

        <Grid container className={classes.homeBox}>
      <Grid item xs={12}>
        <Typography variant="h3" className={classes.contentTextWelcome}>
          Info,
        </Typography>
      </Grid>
      <Grid item xs={12}>
      <Typography variant="subtitle1" className={classes.contentTextDesc}>
        A global survey commissioned by GoDaddy from Redshift Research of small businesses, found that 59% of them did not have a website.
        Yet 83% of people in developed countries use the internet daily. People expect businesses to have their websites, 
        just as they used to expect businesses to have a real physical business address. So as an initiative <b>Purvey.it</b> was started! 
        </Typography>
        <Divider variant="middle" />
      </Grid>
      </Grid>
    )
}

export default About