import {
  cLoadMerchant,
  cLoginCustomer,
  cGetErrors,
  cCreateCustomer,
  cLogoutCustomer,
  cLoadingOn,
  cLoadingOff,
  cConnError
} from "../actions/customer-action";

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const loadMerchantData = (brandName) => async (dispatch) => {
  dispatch(cLoadingOn());
  try {
    axios
      .get(`http://localhost:5000/api/merchant/${brandName}`)
      .then((res) => {
        dispatch(cLoadMerchant(res.data));
        dispatch(cLoadingOff());
      })
      .catch((err) => {
        console.log(err.response);
        if (typeof err.response !== "undefined") {
          dispatch(cGetErrors(err.response.data.errors));
        } else {
          dispatch(cConnError(err));
        }
      });
  } catch (err) {
    dispatch(cConnError(err));

  }
};

export const registerUser = (newUser, merchantid, fn) => async (dispatch) => {
  try {
    axios
      .post(
        `http://localhost:5000/api/customer/register/${merchantid}`,
        newUser
      )
      .then((res) => {
        console.log(res.data.data);

        dispatch(cCreateCustomer(res.data.data));
        dispatch(cGetErrors({}));
        fn();
        //history.push("/signin"); //redirection to login if register successful!
      })
      .catch((err) => {
        console.log(err.response);
        if (typeof err.response !== "undefined") {
          dispatch(cGetErrors(err.response.data.errors));
        } else {
          dispatch(cConnError(err));
        }
      });
  } catch (err) {
    dispatch(cConnError(err));
  }
};

export const loginUser = (user, merchantid) => async (dispatch) => {
  try {
    axios
      .post(`http://localhost:5000/api/customer/login/${merchantid}`, user)
      .then((res) => {
        console.log(res.data);
        const { token } = res.data;
        localStorage.setItem("cjwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user\
        dispatch(cLoginCustomer(decoded));
        dispatch(cGetErrors({}));
      })
      .catch((err) => {
        console.log(err.response);
        if (typeof err.response !== "undefined") {
          dispatch(cGetErrors(err.response.data.errors));
        } else {
          dispatch(cConnError(err));
        }
      });
  } catch (err) {
    dispatch(cConnError(err));
  }
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("cjwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(cLogoutCustomer());
};

export const clearErrors = () => async (dispatch) => {
  dispatch(cGetErrors({}));
};
