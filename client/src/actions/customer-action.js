export const LOAD_MERCHANT = "LOAD_MERCHANT";
export const cLoadMerchant = (merchantData) => ({
  type: LOAD_MERCHANT,
  payload: { merchantData },
});

export const CGET_ERRORS = "CGET_ERRORS";
export const cGetErrors = (errors) => ({
  type: CGET_ERRORS,
  payload: { errors },
});

export const LOGOUT_CUSTOMER = "LOGOUT_CUSTOMER";
export const cLogoutCustomer = () => ({
  type: LOGOUT_CUSTOMER,
  payload: {},
});

export const LOADING_ON = "LOADING_ON";
export const cLoadingOn = () => ({
  type: LOADING_ON,
  payload: {},
});

export const LOADING_OFF = "LOADING_OFF";
export const cLoadingOff = () => ({
  type: LOADING_OFF,
  payload: {},
});

export const CCONN_ERROR = "CCONN_ERROR";
export const cConnError = (err) => ({
  type: CCONN_ERROR,
  payload: { err },
});

export const CSET_CURRENT_USER = "CSET_CURRENT_USER";
export const cSetCurrentUser = (customerData) => ({
  type: CSET_CURRENT_USER,
  payload: { customerData },
});

export const CADD_TO_CART = "CADD_TO_CART";
export const cAddToCart = (product) => ({
  type: CADD_TO_CART,
  payload: { product },
});

export const CPRODUCT_VIEW = "CPRODUCT_VIEW";
export const cProductView = (product) => ({
  type: CPRODUCT_VIEW,
  payload: { product },
});

export const CREMOVE_FROM_CART = "CREMOVE_FROM_CART";
export const cRemoveFromCart = (product) => ({
  type: CREMOVE_FROM_CART,
  payload: { product },
});

export const CMAKE_ORDER = "CMAKE_ORDER";
export const cMakeOrder = () => ({
  type: CMAKE_ORDER,
  payload: {},
});

export const CGET_ORDERS = "CGET_ORDERS";
export const cGetOrders = (orders) => ({
  type: CGET_ORDERS,
  payload: { orders },
});

export const CUPDATE_ORDER_STATUS = "CUPDATE_ORDER_STATUS";
export const cUpdateOrderStatus = (order) => ({
  type: CUPDATE_ORDER_STATUS,
  payload: { order },
});

