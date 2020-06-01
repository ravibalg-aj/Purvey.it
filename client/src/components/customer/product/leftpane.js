import React, { useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Button from "@material-ui/core/Button";

import {
  getCustomerData,
  getCustomer,
} from "../../../selectors/customer-selector";
import { addToCart } from "../../../thunks/customer-thunk";

import CustomSnackBar from "../../utils/snackbar";

const useStyles = makeStyles((theme) => ({
  leftpane: {
    width: "50%",
    padding: theme.spacing(3),
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  productname: {
    marginBottom: theme.spacing(2),
  },
  productdescription: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
    flexWrap: "wrap",
  },
  productprice: {
    alignSelf: "flex-end",
    borderRadius: 8,
    backgroundColor: "#36534766",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  addtocartbutton: {
    alignSelf: "flex-end",
  },
}));

const LeftPane = ({ product, onAddButtonPressed, customer, customerData }) => {
  const classes = useStyles();

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <Box className={classes.leftpane}>
      <Box className={classes.productInfo}>
        <Box className={classes.productname}>
          <Typography variant="h3">{product.name}</Typography>
        </Box>
        <Box className={classes.productdescription}>
          <Typography variant="body1">
          <Box
              dangerouslySetInnerHTML={{ __html: product.description}}
            ></Box>
          </Typography>
        </Box>
        <Box className={classes.productprice}>
          <Typography variant="h6">{"₹ " + product.price}</Typography>
        </Box>
        <Box className={classes.addtocartbutton}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              if (customer.isAuthenticated) {
                onAddButtonPressed(product, customerData._id);
                setAlertMsg("Yay! Product Added to the Cart!");
                setOpenAlert(true);
              } else {
                setAlertMsg("Please Login to Add to Cart!");
                setOpenAlert(true);
              }
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
      <CustomSnackBar
        open={openAlert}
        handleClose={handleAlertClose}
        message={alertMsg}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  customer: getCustomer(state),
  customerData: getCustomerData(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAddButtonPressed: (product, custId) => {
    dispatch(addToCart(product, custId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LeftPane);
