import {
  mLogoutUser,
  mUserLoadingSuccess,
  mUserLoadingProgress,
  mGetErrors,
  mConnError,
  mAddProduct,
  mSetCurrentUser,
  mUpdateProduct,
  mAddStory,
  mGetOrders,
  mUpdateOrderStatus,
} from "../actions/merchant-action";

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import history from "../utils/history";

const localhost = "localhost";
export const registerUser = (newUser, history) => async (dispatch) => {
  try {
    dispatch(mUserLoadingProgress());
    axios
      .post(`http://${localhost}:5000/api/merchant/register`, newUser)
      .then((res) => {
        dispatch(mUserLoadingSuccess());
        history.push("/signin");
        dispatch(mGetErrors({}));
        //history.push("/signin"); //redirection to login if register successful!
      })
      .catch((err) => {
        dispatch(mGetErrors(err.response.data.errors));
      });
  } catch (err) {
    console.log(err);
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
      .post(`http://${localhost}:5000/api/merchant/login`, user)
      .then((res) => {
        dispatch(mUserLoadingSuccess());
        const { token } = res.data.data;
        localStorage.setItem("mjwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user\
        dispatch(setCurrentUser(decoded.id));
        // history.push(`/merchant/${decoded.id}`);
        history.push("/merchant");
        //dispatch(mGetErrors({}));
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

export const addProduct = (newProduct, merchantId) => async (dispatch) => {
  try {
    dispatch(mUserLoadingProgress());
    const formData = new FormData();
    for (var i = 0; i < newProduct.imageUrls.length; i++) {
      formData.append("imageUrls", newProduct.imageUrls[i]);
    }
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    console.log(formData.keys());

    axios
      .post(`http://${localhost}:5000/api/product/${merchantId}`, formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(mAddProduct(res.data.data));
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

export const setCurrentUser = (merchantId) => async (dispatch) => {
  dispatch(mUserLoadingProgress());
  try {
    axios
      .get(`http://${localhost}:5000/api/merchant/${merchantId}`)
      .then((res) => {
        console.log(res.data.data);
        dispatch(mSetCurrentUser(res.data.data));
        dispatch(mUserLoadingSuccess());
      })
      .catch((err) => {
        console.log(err.message);
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

export const updateProduct = (productId, updatedProduct) => async (
  dispatch
) => {
  try {
    axios
      .post(
        `http://${localhost}:5000/api/product/update/${productId}`,
        updatedProduct
      )
      .then((res) => {
        dispatch(mUpdateProduct(res.data.data));
      })
      .catch((err) => {
        console.log(err.message);
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

export const addStory = (story, merchantId) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("imageUrl", story.imageUrl);
    formData.append("image", story.image[0]);
    formData.append("content", story.content);

    axios
      .post(
        `http://${localhost}:5000/api/merchant/story/${merchantId}`,
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(mAddStory(res.data.data));
        dispatch(mUserLoadingSuccess());
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

export const getOrders = (merchantId) => async (dispatch) => {
  console.log("im runing");
  try {
    axios
      .get(`http://${localhost}:5000/api/merchant/orders/${merchantId}`)
      .then((res) => {
        console.log(res.data.data);
        dispatch(mGetOrders(res.data.data));
      })
      .catch((err) => {
        console.log(err.message);
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

export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  console.log(orderId + " " + status);
  try {
    axios
      .post(`http://${localhost}:5000/api/shipping/status/${orderId}/${status}`)
      .then((res) => {
        console.log(res.data.data);
        dispatch(mUpdateOrderStatus(res.data.data));
      })
      .catch((err) => {
        console.log(err.message);
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

export const raiseOrderIssue = (orderId, issueMessage) => async (dispatch) => {
  try {
    axios
      .post(`http://${localhost}:5000/api/shipping/issue/${orderId}`, {
        issueMessage: issueMessage,
      })
      .then((res) => {
        console.log(res.data.data);
        dispatch(mUpdateOrderStatus(res.data.data));
      })
      .catch((err) => {
        console.log(err.message);
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
