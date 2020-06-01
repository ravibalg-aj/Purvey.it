import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";

import Lottie from "react-lottie";
import animationData from "./lottie/loading.json";

import { addProduct } from "../../../thunks/merchant-thunk";
import {
  getMerchantData,
  getErrors,
  getMerchant,
} from "../../../selectors/merchant-selector";

import CustomSnackBar from "../../utils/snackbar";

var isEmpty = require("is-empty");

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    height: "fill-available",
  },
  productdetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: theme.spacing(6),
    width: "70%",
    height: "inherit",
    backgroundColor: "rgba(172,201,2,0.4)",
    // border: "2px solid rgba(240,240,240,1)",
    borderRadius: "16px",

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
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    marginBottom: theme.spacing(1),
    width: "100%",
  },
}));

const LeftPane = ({ merchantData, onSubmitPressed, errors, merchant }) => {
  const classes = useStyles();

  const [pname, setPname] = useState("");
  const [pdesc, setPdesc] = useState("");
  const [pprice, setPprice] = useState("");
  const [pimages, setPimages] = useState([]);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [showLottie, setShowLottie] = useState(true);

  useEffect(() => {
    setOpenAlert(false);
    if (pname.length > 0) {
      setAlertMsg("Added to inventory!");
      setOpenAlert(true);
      setPname("");
      setPdesc("");
      setPprice("");
      setPimages([]);
    }
    setShowLottie(false);
  }, [merchantData.products]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isEmpty(errors)) {
      setShowLottie(false);
    }
  }, [errors]);
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const onSubmit = () => {
    errors = {};
    console.log(pimages);

    const newProduct = {
      name: pname,
      description: pdesc,
      price: pprice,
      imageUrls: pimages,
    };
    console.log(newProduct);
    onSubmitPressed(newProduct, merchantData._id, setOpenAlert);
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
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Box className={classes.productdetails}>
          <Typography variant="h5" className={classes.pageheading}>
            ADD PRODUCT DETAILS
          </Typography>

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
            />
          </Box>
          <Box className={classes.productdescription}>
            <Typography variant="button">DESCRIPTION</Typography>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={10}
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
            />
          </Box>
          <Box className={classes.productdescription}>
            <Typography variant="button">PRICE</Typography>
            <TextField
              id="outlined-start-adornment"
              label={"(only in rupees)"}
              // className={clsx(classes.margin, classes.textField)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₹</InputAdornment>
                ),
              }}
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
            />
          </Box>
          <Box className={classes.filebutton}>
            <Button
              variant="contained"
              color="primary"
              component="label"
              startIcon={<PublishOutlinedIcon />}
            >
              {pimages.length + " images selected"}
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setPimages(e.target.files);
                  console.log(pimages);
                }}
                multiple
              />
            </Button>
            {errors.imageUrls ? (
              <Typography
                variant="caption"
                style={{ padding: "10px", color: "#f44336" }}
              >
                {errors.imageUrls}
              </Typography>
            ) : (
              ""
            )}
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              className={classes.submitbutton}
            >
              Submit
            </Button>
          </Box>
          {showLottie ? (
            <Lottie options={defaultOptions} height={50} width={50} />
          ) : (
            ""
          )}
        </Box>
        <CustomSnackBar
          open={openAlert}
          handleClose={handleAlertClose}
          message={alertMsg}
        />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  merchantData: getMerchantData(state),
  errors: getErrors(state),
  merchant: getMerchant(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmitPressed: (newProduct, merchantid) =>
    dispatch(addProduct(newProduct, merchantid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftPane);
