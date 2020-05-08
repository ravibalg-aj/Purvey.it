import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
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
  contentTextDesc2: {
    fontFamily: "'PT Serif', serif",
    paddingLeft: theme.spacing(3),
    whitespace: "pre-wrap",
    fontSize: 20,
  },
  contentTextDesc3: {
    fontFamily: "'PT Serif', serif",
    paddingLeft: theme.spacing(3),
    whitespace: "pre-wrap",
    fontSize: 20,
    marginLeft: 20,
  },
  contentTextDesc4: {
    fontFamily: "'PT Serif', serif",
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    whitespace: "pre-wrap",
    fontSize: 20,
    marginLeft: 20,
  },
  
}));

const Contact = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.homeBox}>
      <Grid item xs={12}>
        <Typography variant="h4" className={classes.contentTextWelcome}>
          We would love to hear from you,
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box component="span" display="block">
          <Typography variant="subtitle1" className={classes.contentTextDesc}>
            For any queries email at ~ aravibalaji@gmail.com
          </Typography>
        </Box>
        <Box component="span" display="block">
          <Typography variant="subtitle1" className={classes.contentTextDesc2}>
            Our Address
          </Typography>
        </Box>
        <Box component="span" display="block">
          <Typography variant="subtitle1" className={classes.contentTextDesc3}>
            Amrita Vishwa Vidyapeetham,
          </Typography>
        </Box>
        <Box component="span" display="block">
          <Typography variant="subtitle1" className={classes.contentTextDesc4}>
            Ettimadai, Coimbatore
          </Typography>
          <Divider variant="middle" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Contact;
