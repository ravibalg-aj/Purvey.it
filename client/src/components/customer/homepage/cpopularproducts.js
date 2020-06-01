import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import {
  getMerchantProducts,
  getMerchantData,
} from "../../../selectors/customer-selector";
import Product from "../product/productbox";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
    // backgroundColor: "rgba(185,185,185,0.6)",
  },
  textBox: {
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  shopButton: {
    background:
      "linear-gradient(16deg, rgba(255,255,255,1) 0%, rgba(54,83,71,1) 0%, rgba(186,137,92,1) 100%)",
    color: "#f1f1f1",
    padding: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#1e4736",
    },
    marginTop: theme.spacing(4),
  },
  shopText: {
    letterSpacing: "2px",
    // fontFamily: "'Titillium Web', sans-serif",
  },
}));

const CPopularProducts = ({ products, merchantData }) => {
  const classes = useStyles();

  const populars = [];
  for (var i = 0; i < 2; i++) {
    if (i < products.length) {
      populars.push(
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <Product product={products[i]} />
        </Grid>
      );
    }
  }
  return (
    <Box className={classes.root}>
      <Grid container>
        {populars}
        <Grid item xl={12}>
          <Box pt={2} pb={2} className={classes.textBox}>
            <Box>
              <Typography className={classes.shopText} variant="h4">
                {"Some of our In-Demand products"}
              </Typography>
            </Box>
            <Box>
              <Link
                to={`/m/shop/${merchantData.brandName}`}
                style={{ textDecoration: "none" }}
              >
                <Button size="large" className={classes.shopButton}>
                  <Typography className={classes.shopText} variant="h6">
                    {"Shop"}
                  </Typography>
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  products: getMerchantProducts(state),
  merchantData: getMerchantData(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CPopularProducts);
