import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SentimentVerySatisfiedOutlinedIcon from "@material-ui/icons/SentimentVerySatisfiedOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(10),
    },
  },

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
}));

const SignInButton = withStyles((theme) => ({
  root: {
    color: "#F1F1FF",
    backgroundColor: "#365347",
    "&:hover": {
      backgroundColor: "#365347ee",
    },
  },
}))(Button);

const SignUpButton = withStyles((theme) => ({
  root: {
    color: "#365347",
    borderColor: "#365347",
    "&:hover": {
      backgroundColor: "#F1F1F1",
    },
  },
}))(Button);

const Home = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="flex-end"
      className={classes.homeBox}
    >
      <Grid item xs={12}>
        <Typography variant="h3" className={classes.contentTextWelcome}>
          Welcome,
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" className={classes.contentTextDesc}>
          Hello there mate{" "}
          <SentimentVerySatisfiedOutlinedIcon style={{ fontSize: 16 }} />{" "}
          Started a small business and looking for how to make it more
          productive? Create a website, it is damn simple here. Just Sign-up for
          an account, put on your products and that's it. We'll publish it and
          take care of all transactions and stuff. You can take rest and make
          ready to ship it{" "}
          <LocalShippingOutlinedIcon style={{ fontSize: 16 }} />
        </Typography>
      </Grid>

      <Grid item xs={12} className={classes.root}>
        <ButtonGroup
          size="large"
          aria-label="large outlined primary button group"
        >
          <SignUpButton>
            <Link
              to="/signup"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Sign-up
            </Link>
          </SignUpButton>

          <SignInButton>
            <Link
              to="/signin"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              Sign-In
            </Link>
          </SignInButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default Home;
