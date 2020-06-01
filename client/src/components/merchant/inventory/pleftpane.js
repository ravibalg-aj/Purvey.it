import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Lottie from "react-lottie";
import animationData from "../addproduct/lottie/loading.json";

import { updateProduct } from "../../../thunks/merchant-thunk";
import {
  getMerchantData,
  getErrors,
  getMerchant,
} from "../../../selectors/merchant-selector";

import CustomSnackBar from "../../utils/snackbar";

var isEmpty = require("is-empty");

const useStyles = makeStyles((theme) => ({
  productdetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: theme.spacing(2),
    width: "100%",
    height: "100%",
    // backgroundColor: "rgba(172,201,2,0.4)",
    // border: "2px solid rgba(240,240,240,1)",
    // borderRadius: "16px",

    // boxShadow: "5px 15px 50px 10px rgba(0,0,0,0.5)",
  },
  pageheading: {
    padding: theme.spacing(1.5),
    backgroundColor: "#ffffff",
    borderRadius: "8px",
  },
  productheading: { marginTop: theme.spacing(1), color: "#fda47e" },
  productname: { width: "100%" },
  productdescription: { width: "100%" },
  filebutton: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
  submitbutton: {
    marginBottom: theme.spacing(1),
  },
}));

const PLeftPane = ({
  product,
  merchantData,
  onSubmitPressed,
  errors,
  merchant,
}) => {
  const classes = useStyles();

  const [pname, setPname] = useState(product.name);
  const [pdesc, setPdesc] = useState(product.description);
  const [pprice, setPprice] = useState(product.price);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [showLottie, setShowLottie] = useState(false);

  const [editOn, setEditOn] = useState(false);
  useEffect(() => {
    if (editOn) {
      setAlertMsg("Updated you product!");
      setOpenAlert(true);
      setShowLottie(false);
      setEditOn(false);
    }
  }, [merchantData.products]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isEmpty(errors)) {
      setShowLottie(false);
    }
  }, [errors]);

  useEffect(() => {
    setPname(product.name);
    setPdesc(product.description);
    setPprice(product.price);
    setEditOn(false);
  }, [product]);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const onReset = () => {
    setPname(product.name);
    setPdesc(product.description);
    setPprice(product.price);
    setEditOn(false);
  };

  const onSubmit = () => {
    errors = {};

    const updatedProduct = {
      name: pname,
      description: pdesc,
      price: pprice,
    };

    console.log(updatedProduct);
    onSubmitPressed(product._id, updatedProduct);
    setShowLottie(true);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Box className={classes.productdetails}>
      <Box className={classes.productname}>
        <Typography variant="button">NAME </Typography>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={pname}
          label={"Give a name to your product"}
          onChange={(e) => {
            setPname(e.target.value);
          }}
          fullWidth
          error={errors.name ? true : false}
          helperText={errors.name}
          className={classes.productheading}
          InputProps={{
            readOnly: !editOn,
          }}
        />
      </Box>
      <Box className={classes.productdescription}>
        <Typography variant="button">DESCRIPTION</Typography>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={16}
          variant="outlined"
          value={pdesc}
          label={"Give a brief description about your product"}
          onChange={(e) => {
            setPdesc(e.target.value);
          }}
          fullWidth
          error={errors.description ? true : false}
          helperText={errors.description}
          className={classes.productheading}
          InputProps={{
            readOnly: !editOn,
          }}
        />
      </Box>
      <Box className={classes.productdescription}>
        <Typography variant="button">PRICE</Typography>
        <TextField
          id="outlined-start-adornment"
          label={"(only in rupees)"}
          variant="outlined"
          type="number"
          value={pprice}
          onChange={(e) => {
            setPprice(e.target.value);
          }}
          fullWidth
          error={errors.price ? true : false}
          helperText={errors.price}
          className={classes.productheading}
          InputProps={{
            startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            readOnly: !editOn,
          }}
        />
      </Box>

      {editOn ? (
        <Box>
          <Box>
            <ButtonGroup
              variant="contained"
              color="primary"
              className={classes.submitbutton}
            >
              <Button onClick={onSubmit}>Save it</Button>
              <Button onClick={onReset}>Reset</Button>
            </ButtonGroup>
          </Box>
          <Box>
            {showLottie ? (
              <Lottie options={defaultOptions} height={50} width={50} />
            ) : (
              ""
            )}
          </Box>
        </Box>
      ) : (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditOn(true);
            }}
            className={classes.submitbutton}
          >
            Edit it
          </Button>
        </Box>
      )}
      <CustomSnackBar
        open={openAlert}
        handleClose={handleAlertClose}
        message={alertMsg}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  merchantData: getMerchantData(state),
  errors: getErrors(state),
  merchant: getMerchant(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitPressed: (productId, updatedProduct) =>
    dispatch(updateProduct(productId, updatedProduct)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PLeftPane);
