import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import Product from "../product/productbox";
const useStyles = makeStyles((theme) => ({
  root: {
      padding: theme.spacing(3),
  },
}));

const MBottomPane = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Grid container>
        <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
          <Product />
        </Grid>
        <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
          <Product />
        </Grid>
        <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
          <Product />
        </Grid>
        <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
          <Product />
        </Grid>
        <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
          <Product />
        </Grid>
        <Grid item xl={4} lg={6} md={6} sm={12} xs={12} >
          <Product />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MBottomPane;
