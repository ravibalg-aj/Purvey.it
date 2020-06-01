import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import PLeftPane from "./pleftpane";
import PRightPane from "./prightpane";
import bg from "../../../images/inventoryBG.svg";

const isEmpty = require("is-empty");

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: "inherit",
  },
  content: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  noproduct: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(3),
  },
  noproductimage: {
    marginBottom: theme.spacing(8),
    height: "500",
    width: "500px",
  },
}));
const ProductView = ({ product }) => {
  const classes = useStyles();

  const content = (
    <Box className={classes.content}>
      <Grid container>
        <Grid item xs={6}>
          <PLeftPane product={product} />
        </Grid>
        <Grid item xs={6}>
          <PRightPane product={product} />
        </Grid>
      </Grid>
    </Box>
  );

  const noProduct = (
    <Box className={classes.noproduct}>
      <Box>
        <img
          src={bg}
          className={classes.noproductimage}
          alt="addproduct-sidebar"
        />
      </Box>
      <Box>
        <Typography variant="subtitle1">
          {"( Select a Product to VIEW or EDIT )"}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box className={classes.root}>{isEmpty(product) ? noProduct : content}</Box>
  );
};

export default ProductView;
