import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { registerUser, clearErrors } from "../../../../thunks/customer-thunk";
import { getMerchantData,getErrors,getCustomerData} from '../../../../selectors/customer-selector'

const useStyles = makeStyles((theme) => ({
  dialogbox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  form: {
    width: "80%",
    marginBottom: theme.spacing(2),
  },
}));

const CSignUp = ({
  open,
  handleClose,
  handleSigninOpen,
  merchantData,
  errors,
  onSubmitPressed,
  customerData,
  clearAllErrors,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onSubmit = () => {
    const newCust = {
      name: name,
      email: email,
      password: password,
      password2: password2,
    };

    console.log(newCust);
    onSubmitPressed(newCust, merchantData._id, handleInOpen);
  };

  const handleInOpen = () => {
    handleClose();
    handleSigninOpen();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        <Box display="flex">
          <Box flexGrow={1}>{"Please sign-up here!"}</Box>
          <Box>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {"Just a lil bit a work just to make all's accounted safely."}
        </DialogContentText>
      </DialogContent>
      <Box className={classes.dialogbox}>
        <form className={classes.form}>
          <TextField
            className={classes.textField}
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => {
              e.persist();
              setName(e.target.value);
            }}
            error={errors.name ? true : false}
            helperText={errors.email}
          />
          <TextField
            className={classes.textField}
            variant="filled"
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
            className={classes.textField}
            variant="filled"
            type="password"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            autoFocus
            value={password}
            onChange={(e) => {
              e.persist();
              setPassword(e.target.value);
            }}
            error={errors.password ? true : false}
            helperText={errors.password}
          />
          <TextField
            className={classes.textField}
            variant="filled"
            type="password"
            margin="normal"
            required
            fullWidth
            id="password2"
            label="Confirm Password"
            name="password2"
            autoComplete="password2"
            autoFocus
            value={password2}
            onChange={(e) => {
              e.persist();
              setPassword2(e.target.value);
            }}
            error={errors.password2 ? true : false}
            helperText={errors.password2}
          />
        </form>
      </Box>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            clearAllErrors();
            handleInOpen();
          }}
          color="primary"
        >
          {"Already? Sign-In"}
        </Button>
        <Button onClick={onSubmit} type="submit" color="primary" autoFocus>
          Sign-Up
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  merchantData: getMerchantData(state),
  errors: getErrors(state),
  customerData: getCustomerData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitPressed: (user, merchantid, fn) =>
    dispatch(registerUser(user, merchantid, fn)),
    clearAllErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CSignUp);
