export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
export const cCreateCustomer = (newCustomer) => ({
  type: CREATE_CUSTOMER,
  payload: { newCustomer },
});

export const LOAD_MERCHANT = "LOAD_MERCHANT";
export const cLoadMerchant = (merchantData) => ({
  type: LOAD_MERCHANT,
  payload: { merchantData },
});

export const LOGIN_CUSTOMER = "LOGIN_CUSTOMER";
export const cLoginCustomer = (customerData) => ({
  type: LOGIN_CUSTOMER,
  payload: { customerData },
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
