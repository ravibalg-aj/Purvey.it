import React from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import CHomepage from "./homepage/chomepage";
import CShop from "./shop/cshop";
import ProductView from "./product/productview";
import CCart from "./cart/ccart";
import COrder from "./orders/corders";

import { Switch, Route } from "react-router-dom";

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

const Customer = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
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
    </ThemeProvider>
  );
};

export default Customer;
