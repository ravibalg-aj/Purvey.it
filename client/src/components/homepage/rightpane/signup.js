import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
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
import history from "../../../utils/history";

import { registerUser } from "../../../thunks/merchant-thunk";
import {
  getMerchantData,
  getErrors,
} from "../../../selectors/merchant-selector";

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

const SignUp = ({ merchant, onSubmitPressed, errors }) => {
  const classes = useStyles();

  const [brandName, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = () => {
    const newUser = {
      brandName: brandName,
      email: email,
      password: password,
      password2: password2,
    };

    console.log(history);
    onSubmitPressed(newUser, history);
  };
  return (
    <ThemeProvider theme={formTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <FavoriteTwoToneIcon className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="brandName"
              label="Brand Name"
              name="brandName"
              autoComplete="brandName"
              value={brandName}
              onChange={(e) => {
                e.persist();
                setBrandName(e.target.value);
              }}
              error={errors.brandName ? true : false}
              helperText={errors.brandName}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                e.persist();
                setEmail(e.target.value);
              }}
              error={errors.email ? true : false}
              helperText={errors.email}
              autoFocus
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              autoComplete="current-password"
              value={password2}
              onChange={(e) => {
                e.persist();
                setPassword2(e.target.value);
              }}
              error={errors.password2 ? true : false}
              helperText={errors.password2}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Already have an account? Sign In"}
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
  merchant: getMerchantData(state),
  errors: getErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitPressed: (newUser, history) =>
    dispatch(registerUser(newUser, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
