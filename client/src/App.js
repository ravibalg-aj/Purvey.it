import React from "react";
import "./App.css";

import Homepage from "./components/homepage/mainpage";
import { Router, Switch, Route } from "react-router-dom";
import history from "./utils/history";
import { connect } from "react-redux";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import CHomepage from "./components/customer/homepage/chomepage";
import CShop from "./components/customer/shop/cshop";
import ProductView from "./components/customer/product/productview";
import CCart from "./components/customer/cart/ccart";
import COrder from "./components/customer/orders/corders";
// import MerchantPrivateRoute from "./components/privateroute/merchantroute";
import { getCConnectionError } from "./selectors/customer-selector";
import { getMConnectionError } from "./selectors/merchant-selector";
import Error from "./components/utils/error";

var isEmpty = require("is-empty");

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#365347",
    },
    secondary: {
      main: "#BA895C",
    },
  },
});

function App({ cConnError, mConnError }) {
  const content = (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/:id" component={Homepage} />
      {/* <MerchantPrivateRoute
    path="/merchant/:id"
    component={MerHomepage}
  /> */}
      <Route exact path="/m/:id" component={CHomepage} />
      <Route exact path="/m/shop/:id" component={CShop} />
      <Route exact path="/m/cart/:id" component={CCart} />
      <Route exact path="/m/order/:id" component={COrder} />
      <Route exact path="/m/product/:id/:productid" component={ProductView} />
    </Switch>
  );
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <div className="App">
          {isEmpty(cConnError) && isEmpty(mConnError) ? (
            content
          ) : (
            <Error mMsg={mConnError} cMsg={cConnError} />
          )}
        </div>
      </ThemeProvider>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  cConnError: getCConnectionError(state),
  mConnError: getMConnectionError(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
