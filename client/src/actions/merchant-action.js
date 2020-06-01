export const USER_LOADING_PROGRESS = "USER_LOADING_PROGRESS";
export const mUserLoadingProgress = () => ({
  type: USER_LOADING_PROGRESS,
});

export const USER_LOADING_SUCCESS = "USER_LOADING_SUCCESS";
export const mUserLoadingSuccess = () => ({
  type: USER_LOADING_SUCCESS,
});

export const LOGOUT_USER = "LOGOUT_USER";
export const mLogoutUser = () => ({
  type: LOGOUT_USER,
});

export const MGET_ERRORS = "MGET_ERRORS";
export const mGetErrors = (errors) => ({
  type: MGET_ERRORS,
  payload: { errors },
});

export const MCONN_ERROR = "MCONN_ERROR";
export const mConnError = (err) => ({
  type: MCONN_ERROR,
  payload: { err },
});

export const MSET_CURRENT_USER = "MSET_CURRENT_USER";
export const mSetCurrentUser = (merchantData) => ({
  type: MSET_CURRENT_USER,
  payload: { merchantData },
});

export const MADD_PRODUCT = "MADD_PRODUCT";
export const mAddProduct = (product) => ({
  type: MADD_PRODUCT,
  payload: { product },
});

export const MUPDATE_PRODUCT = "MUPDATE_PRODUCT";
export const mUpdateProduct = (product) => ({
  type: MUPDATE_PRODUCT,
  payload: { product },
});

export const MADD_STORY = "MADD_STORY";
export const mAddStory = (story) => ({
  type: MADD_STORY,
  payload: { story },
});

export const MGET_ORDERS = "MGET_ORDERS";
export const mGetOrders = (orders) => ({
  type: MGET_ORDERS,
  payload: { orders },
});

export const MUPDATE_ORDER_STATUS = "MUPDATE_ORDER_STATUS";
export const mUpdateOrderStatus = (order) => ({
  type: MUPDATE_ORDER_STATUS,
  payload: { order },
});
