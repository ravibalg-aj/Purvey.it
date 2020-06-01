import React from "react";
import "./App.css";

import Homepage from "./components/homepage/mainpage";
import { Router, Switch, Route } from "react-router-dom";
import history from "./utils/history";
import { connect } from "react-redux";

import Customer from "./components/customer/";

import MHomePage from "./components/merchant/mhomepage";
import MerchantPrivateRoute from "./components/privateroute/merchantroute";
import { getCConnectionError } from "./selectors/customer-selector";
import { getMConnectionError } from "./selectors/merchant-selector";
import Error from "./components/utils/error";

var isEmpty = require("is-empty");

function App({
  cConnError,
  mConnError,
}) {
  const content = (
    <Switch>
      {/* <Route exact path="/merchant" component={MHomePage} /> */}
      <MerchantPrivateRoute path="/merchant" component={MHomePage} />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/:id" component={Homepage} />

      <Route exact path="/m/:id" component={Customer} />
      <Route exact path="/m/shop/:id" component={Customer} />
      <Route exact path="/m/cart/:id" component={Customer} />
      <Route exact path="/m/order/:id" component={Customer} />
      <Route exact path="/m/product/:id/:productid" component={Customer} />
    </Switch>
  );
  return (
    <Router history={history}>
      <div className="App">
        {isEmpty(cConnError) && isEmpty(mConnError) ? (
          content
        ) : (
          <Error mMsg={mConnError} cMsg={cConnError} />
        )}
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  cConnError: getCConnectionError(state),
  mConnError: getMConnectionError(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
