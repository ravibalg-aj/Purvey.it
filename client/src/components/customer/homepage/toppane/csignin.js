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

import { loginUser, clearErrors } from "../../../../thunks/customer-thunk";
import { connect } from "react-redux";
import { getMerchantData,getErrors} from '../../../../selectors/customer-selector'


const useStyles = makeStyles((theme) => ({
  dialogbox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  form: {
    width: "80%",
    marginBottom: theme.spacing(4),
  },
}));

const CSignIn = ({
  open,
  handleClose,
  handleSignupOpen,
  onSubmitPressed,
  merchantData,
  errors,
  clearAllErrors
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    const cust = {
      email: email,
      password: password,
    };

    console.log(cust);
    console.log(merchantData._id);
    onSubmitPressed(cust, merchantData._id);
  };

  const handleUpOpen = () => {
    handleClose();
    handleSignupOpen();
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
          <Box flexGrow={1}>{"Please sign-in here!"}</Box>
          <Box>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="close"
              scroll="paper"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {"Login and enjoy our products! <3"}
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
        </form>
      </Box>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            clearAllErrors();
            handleUpOpen();
          }}
          color="primary"
        >
          {"Not a User? Sign-Up"}
        </Button>
        <Button onClick={onSubmit} type="submit" color="primary" autoFocus>
          {"Sign-In"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  merchantData: getMerchantData(state),
  errors: getErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitPressed: (user, merchantid) => dispatch(loginUser(user, merchantid)),
  clearAllErrors: () => dispatch(clearErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(CSignIn);
