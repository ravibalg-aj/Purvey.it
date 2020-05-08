import {
  LOAD_MERCHANT,
  CREATE_CUSTOMER,
  LOGIN_CUSTOMER,
  CGET_ERRORS,
  LOGOUT_CUSTOMER,
  LOADING_ON,
  LOADING_OFF,
  CCONN_ERROR,
} from "../actions/customer-action";
const isEmpty = require("is-empty");

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  merchantData: {},
  data: {},
  errors: {},
  connError: {},
};

export const customer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_MERCHANT: {
      const { merchantData } = payload;
      return {
        ...state,
        merchantData: merchantData.data,
      };
    }

    case CREATE_CUSTOMER: {
      const { newCustomer } = payload;
      return {
        ...state,
        data: newCustomer,
      };
    }
    case LOGIN_CUSTOMER: {
      const { customerData } = payload;
      console.log(customerData);
      return {
        ...state,
        isAuthenticated: !isEmpty(customerData),
        data: { _id: customerData.id, name: customerData.email },
      };
    }

    case LOGOUT_CUSTOMER: {
      return {
        ...state,
        isAuthenticated: false,
        data: {},
      };
    }
    case CGET_ERRORS: {
      const { errors } = payload;
      return {
        ...state,
        errors: errors,
      };
    }

    case LOADING_ON: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case LOADING_OFF: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case CCONN_ERROR: {
      const {err} = payload;
      return {
        ...state,
        connError: err,
      };
    }

    default:
      return state;
  }
};
