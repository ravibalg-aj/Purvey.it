import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getMerchantProducts } from "../../../selectors/customer-selector";
import Product from "../product/productbox";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  noproducts:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    letterSpacing: "2px",
    height:"60vh",
  }
}));

const CBottomPane = ({ products }) => {
  console.log(products);
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {products ? (
        <Grid container>
          {products.map((product) => (
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" className={classes.noproducts}>
        {"No Products found Please come back later"}
        </Typography>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  products: getMerchantProducts(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CBottomPane);
