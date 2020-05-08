import React, { useEffect } from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import MTopPane from "./toppane/ctoppane";
import MBottomPane from "./cbottompane";
import { Box } from "@material-ui/core";

import { connect } from "react-redux";
import { loadMerchantData } from "../../thunks/customer-thunk";
import Loading from "../utils/loading";
import Error from "../utils/error";
import { getMerchantData,getCustomer} from '../../selectors/customer-selector'

const isEmpty = require("is-empty");

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#365347",
    },
    secondary: {
      main: "#BA895C",
    },
    background: {
      paper: "rgb(194,195,191)",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  homeBox: {
    height: "100%",
    backgroundColor: "#ffffff",
  },
  topPane: {},
}));

//let content = "Balg";
const CHomepage = ({ match, merchantData, runOnLoad, customer }) => {
  useEffect(() => {
    runOnLoad(match.params.id);
  }, []);

  const classes = useStyles();

  const content = (
    <ThemeProvider theme={theme}>
      <Box>
        <Grid container className={classes.homeBox}>
          <Grid item xs={12} className={classes.topPane}>
            <MTopPane
              brandName={
                isEmpty(merchantData) ? "Balg" : merchantData.brandName
              }
            />
          </Grid>
          <Grid item xs={12}>
            <MBottomPane />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );

  return <div>
    
    {customer.isLoading ? <Loading /> : (isEmpty(merchantData) ? <Error /> : content)}
  </div>
};

const mapStateToProps = (state) => ({
  merchantData: getMerchantData(state),
  customer: getCustomer(state),
});

const mapDispatchToProps = (dispatch) => ({
  runOnLoad: (brandName) => dispatch(loadMerchantData(brandName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CHomepage);
