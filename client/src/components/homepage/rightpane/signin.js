import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import Typography from "@material-ui/core/Typography";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser } from "../../../thunks/merchant-thunk";
import { getErrors } from "../../../selectors/merchant-selector";

const formTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#365347",
    },
    secondary: {
      main: "#BA895C",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    color: "#BA895C",
    fontSize: 32,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ onSubmitPressed, errors }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    const user = {
      email: email,
      password: password,
    };

    console.log(user);
    onSubmitPressed(user);
  };

  return (
    <ThemeProvider theme={formTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <FavoriteTwoToneIcon className={classes.avatar} />

          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                e.persist();
                setEmail(e.target.value);
              }}
              error={errors.email ? true : false}
              helperText={errors.email}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                e.persist();
                setPassword(e.target.value);
              }}
              error={errors.password ? true : false}
              helperText={errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  errors: getErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitPressed: (user) => dispatch(loginUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
