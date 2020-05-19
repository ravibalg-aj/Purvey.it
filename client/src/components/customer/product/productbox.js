import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { addToCart } from "../../../thunks/customer-thunk";
import {
  getCustomerData,
  getCustomer,
  getMerchantData,
} from "../../../selectors/customer-selector";

import CustomSnackBar from "../../utils/snackbar";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: "#f1f1f133",
    fontSize: 20,
  },
  imageBox: {
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  nameRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
    letterSpacing: "2px",
  },
  addtoCardRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  imgTag: {
    objectFit: "cover",
    height: "600px",
  },
  productinfo: {
    fontSize:24,
    fontFamily: "'Spectral', serif",
    letterSpacing: "1px",
  },
}));

const Product = ({
  product,
  onAddButtonPressed,
  customerData,
  customer,
  merchantData,
}) => {
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
    <Container component="main" maxWidth="md">
      <div className={classes.paper}>
        <Link
          to={`/m/product/${merchantData.brandName}/${product._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
        <Box className={classes.imageBox}>
          <GridList className={classes.gridList} cols={1} cellHeight="auto">
            {product.imageUrls.map((imageUrl, i) => (
              <GridListTile key={i}>
                <img
                  src={imageUrl}
                  alt="product img"
                  className={classes.imgTag}
                />
              </GridListTile>
            ))}
          </GridList>
        </Box>

        <Box pl={3} pr={3} className={classes.nameRow}>
          <Box>
            <Typography className={classes.productinfo} variant="subtitle1">
              {product.name}
            </Typography>
          </Box>
          <Box>
            <Typography className={classes.productinfo} variant="subtitle1">
              ₹{product.price}
            </Typography>
          </Box>
        </Box>
        </Link>

        <Box pl={3} pr={3} className={classes.addtoCardRow}>
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
      </div>
      <CustomSnackBar
        open={openAlert}
        handleClose={handleAlertClose}
        message={alertMsg}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  merchantData: getMerchantData(state),
  customerData: getCustomerData(state),
  customer: getCustomer(state),
});

const mapDispatchToProps = (dispatch) => ({
  onAddButtonPressed: (product, custId) => {
    dispatch(addToCart(product, custId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
