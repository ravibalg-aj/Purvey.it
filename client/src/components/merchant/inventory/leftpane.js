import React, { useState } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { getProducts } from "../../../selectors/merchant-selector";

import ProductView from "./productview";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selector: {
    width: "100%",
  },
}));

const LeftPane = ({ products }) => {
  const classes = useStyles();

  const [productName, setProductName] = useState("");
  const [product, setProduct] = useState({});

  const handleProductNameChange = (event) => {
    const productId = event.target.value;
    setProductName(productId);
    const temp = products.filter((p) => p._id === productId);
    setProduct(temp[0]);
  };

  return (
    <Box>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-label"
              className={classes.inputlabel}
            >
              Select Product
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={productName}
              onChange={handleProductNameChange}
              className={classes.selector}
            >
              {products.map((product) => (
                <MenuItem value={product._id} key={product._id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} styles={{ height: "inherit" }}>
          <ProductView product={product} />
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  products: getProducts(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LeftPane);
