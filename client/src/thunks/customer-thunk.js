import {
  cLoadMerchant,
  cGetErrors,
  cLogoutCustomer,
  cLoadingOn,
  cLoadingOff,
  cConnError,
  cSetCurrentUser,
  cAddToCart,
  cProductView,
  cRemoveFromCart,
  cMakeOrder,
  cGetOrders,
  cUpdateOrderStatus
} from "../actions/customer-action";

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

const localhost = "localhost";
export const loadMerchantData = (brandName) => async (dispatch) => {
  dispatch(cLoadingOn());
  try {
    axios
      .get(`http://${localhost}:5000/api/merchant/customer/${brandName}`)
      .then((res) => {
        dispatch(cLoadMerchant(res.data));
        dispatch(cLoadingOff());
      })
      .catch((err) => {
        console.log(err);
        if (typeof err.response !== "undefined") {
          dispatch(cConnError(err.response.data.errors));
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
        `http://${localhost}:5000/api/customer/register/${merchantid}`,
        newUser
      )
      .then((res) => {
        console.log(res.data.data);
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
      .post(`http://${localhost}:5000/api/customer/login/${merchantid}`, user)
      .then((res) => {
        console.log(res.data);
        const { token } = res.data;
        localStorage.setItem("cjwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user\
        dispatch(setCurrentUser(decoded.id));
        dispatch(cGetErrors({}));
      })
      .catch((err) => {
        console.log(err);
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

export const setCurrentUser = (custId) => async (dispatch) => {
  dispatch(cLoadingOn());
  try {
    axios
      .get(`http://${localhost}:5000/api/customer/${custId}`)
      .then((res) => {
        console.log(res.data.data);
        dispatch(cSetCurrentUser(res.data));
        dispatch(loadOrderDetails(res.data.data.merchantId,custId));
        dispatch(cLoadingOff());
      })
      .catch((err) => {
        console.log(err.message);
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

export const addToCart = (product, custId) => async (dispatch) => {
  try {
    axios
      .post(`http://${localhost}:5000/api/customer/cart/${custId}`, product)
      .then((res) => {
        dispatch(cAddToCart(res.data.data));
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

export const getSpecificProduct = (brandName, productId) => async (
  dispatch
) => {
  dispatch(cLoadingOn());
  try {
    axios
      .get(`http://${localhost}:5000/api/product/${brandName}/${productId}`)
      .then((res) => {
        console.log(res.data.data);
        dispatch(cProductView(res.data.data));
        dispatch(cLoadingOff());
      })
      .catch((err) => {
        console.log(err.response);
        if (typeof err.response !== "undefined") {
          dispatch(cConnError(err.response.data.errors));
        } else {
          dispatch(cConnError(err));
        }
      });
  } catch (err) {
    dispatch(cConnError(err));
  }
};

export const removeFromCart = (custId, productId) => async (dispatch) => {
  try {
    axios
      .delete(
        `http://${localhost}:5000/api/customer/cart/${custId}/${productId}`
      )
      .then((res) => {
        dispatch(cRemoveFromCart(res.data.data));
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

export const makeOrder = (orderDetails) => async (dispatch) => {
  try {
    console.log(orderDetails);

    axios
      .post(`http://${localhost}:5000/api/shipping`, orderDetails)
      .then((res) => {
        console.log(res.data.data);
        dispatch(cMakeOrder());
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

export const loadOrderDetails = (merchantId, customerId) => async (
  dispatch
) => {
  dispatch(cLoadingOn());

  try {
    axios
      .get(
        `http://${localhost}:5000/api/customer/orders/${merchantId}/${customerId}`
      )
      .then((res) => {
        console.log(res);
        dispatch(cGetOrders(res.data.data));
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

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  console.log(orderId + " " + status);
  try {
    axios
      .post(`http://${localhost}:5000/api/shipping/status/${orderId}/${status}`)
      .then((res) => {
        console.log(res.data.data);
        dispatch(cUpdateOrderStatus(res.data.data));
      })
      .catch((err) => {
        console.log(err.message);
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