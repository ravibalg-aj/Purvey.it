import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";



const MerchantPrivateRoute = ({ component: Component, merchant,...rest}) => {
    return (
        <Route
        {...rest}
    render={(props) =>
      merchant.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);
}
  
const mapStateToProps = (state) => ({
  merchant: state.merchant,
});
export default connect(mapStateToProps)(MerchantPrivateRoute);
