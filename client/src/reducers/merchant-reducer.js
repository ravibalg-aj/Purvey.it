import {
  LOGOUT_USER,
  USER_LOADING_SUCCESS,
  USER_LOADING_PROGRESS,
  MGET_ERRORS,
  MCONN_ERROR,
  MSET_CURRENT_USER,
  MADD_PRODUCT,
  MUPDATE_PRODUCT,
  MADD_STORY,
  MGET_ORDERS,
  MUPDATE_ORDER_STATUS,
} from "../actions/merchant-action";
// const isEmpty = require("is-empty");

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  data: {},
  errors: {},
  connError: {},
  orderDetails: [],
};

export const merchant = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGOUT_USER: {
      return { ...state, isAuthenticated: false, data: {} };
    }

    case USER_LOADING_PROGRESS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case USER_LOADING_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case MGET_ERRORS: {
      const { errors } = payload;
      return {
        ...state,
        errors: errors,
      };
    }

    case MCONN_ERROR: {
      const { err } = payload;
      return {
        ...state,
        connError: err,
      };
    }

    case MSET_CURRENT_USER: {
      const { merchantData } = payload;
      return {
        ...state,
        isAuthenticated: true,
        data: merchantData,
      };
    }

    case MADD_PRODUCT: {
      const { product } = payload;
      return {
        ...state,
        data: { ...state.data, products: state.data.products.concat(product) },
      };
    }

    case MUPDATE_PRODUCT: {
      const { product: updatedProduct } = payload;
      state.data.products = state.data.products.filter(
        (product) => product._id !== updatedProduct._id
      );
      return {
        ...state,
        data: {
          ...state.data,
          products: state.data.products.concat(updatedProduct),
        },
      };
    }

    case MADD_STORY: {
      const { story: newStory } = payload;
      return {
        ...state,
        data: { ...state.data, story: newStory },
      };
    }

    case MGET_ORDERS: {
      const { orders } = payload;
      return {
        ...state,
        orderDetails: orders,
      };
    }

    case MUPDATE_ORDER_STATUS: {
      const { order: updatedOrder } = payload;
      state.orderDetails = state.orderDetails.filter(
        (order) => order._id !== updatedOrder._id
      );
      return {
        ...state,
        orderDetails: state.orderDetails.concat(updatedOrder),
      };
    }

    default: {
      return state;
    }
  }
};
