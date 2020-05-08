import {
  mCreateUser,
  mLoginUser,
  mLogoutUser,
  mUserLoadingSuccess,
  mUserLoadingProgress,
  mGetErrors,
  mConnError,
} from "../actions/merchant-action";

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const registerUser = (newUser, history) => async (dispatch) => {
  try {
    dispatch(mUserLoadingProgress());
    axios
      .post("http://localhost:5000/api/merchant/register", newUser)
      .then((res) => {
        dispatch(mCreateUser(res.data.data));
        dispatch(mUserLoadingSuccess());
        history.push("/signin");
        dispatch(mGetErrors({}));
        //history.push("/signin"); //redirection to login if register successful!
      })
      .catch((err) => {
        dispatch(mGetErrors(err.response.data.errors));
      });
  } catch (err) {
    console.log(err.response);
        if (typeof err.response !== "undefined") {
          dispatch(mGetErrors(err.response.data.errors));
        } else {
          dispatch(mConnError(err));
        }
  }
};

export const loginUser = (user) => (dispatch) => {
  try {
    dispatch(mUserLoadingProgress());

    axios
      .post("http://localhost:5000/api/merchant/login", user)
      .then((res) => {
        dispatch(mUserLoadingSuccess());
        const { token } = res.data.data;
        localStorage.setItem("mjwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user\
        dispatch(mLoginUser(decoded));
        dispatch(mGetErrors({}));
      })
      .catch((err) => {
        console.log(err.response);
        if (typeof err.response !== "undefined") {
          dispatch(mGetErrors(err.response.data.errors));
        } else {
          dispatch(mConnError(err));
        }
      });
  } catch (err) {
    dispatch(mConnError(err));
  }
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("mjwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(mLogoutUser());
};
