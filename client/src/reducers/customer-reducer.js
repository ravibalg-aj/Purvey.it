import {
  LOAD_MERCHANT,
  CGET_ERRORS,
  LOGOUT_CUSTOMER,
  LOADING_ON,
  LOADING_OFF,
  CCONN_ERROR,
  CSET_CURRENT_USER,
  CADD_TO_CART,
  CPRODUCT_VIEW,
  CREMOVE_FROM_CART,
  CMAKE_ORDER,
  CGET_ORDERS,
  CUPDATE_ORDER_STATUS,
} from "../actions/customer-action";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  merchantData: {},
  data: {},
  errors: {},
  connError: {},
  productView: {},
  orderDetails: [],
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

    case LOGOUT_CUSTOMER: {
      return {
        ...state,
        isAuthenticated: false,
        data: {},
        orderDetails: [],
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
      const { err } = payload;
      return {
        ...state,
        connError: err,
      };
    }

    case CSET_CURRENT_USER: {
      const { customerData } = payload;
      return {
        ...state,
        isAuthenticated: true,
        data: customerData.data,
      };
    }

    case CADD_TO_CART: {
      const { product } = payload;
      return {
        ...state,
        data: { ...state.data, cart: state.data.cart.concat(product) },
      };
    }

    case CPRODUCT_VIEW: {
      const { product } = payload;
      return {
        ...state,
        productView: product,
      };
    }

    case CREMOVE_FROM_CART: {
      const { product: removedProduct } = payload;
      return {
        ...state,
        data: {
          ...state.data,
          cart: state.data.cart.filter(
            (product) => product._id !== removedProduct._id
          ),
        },
      };
    }

    case CMAKE_ORDER: {
      return {
        ...state,
        data: { ...state.data, cart: [] },
      };
    }

    case CGET_ORDERS: {
      const { orders } = payload;
      return {
        ...state,
        orderDetails: orders,
      };
    }

    case CUPDATE_ORDER_STATUS: {
      const { order: updatedOrder } = payload;
      state.orderDetails = state.orderDetails.filter(
        (order) => order._id !== updatedOrder._id
      );
      return {
        ...state,
        orderDetails: state.orderDetails.concat(updatedOrder),
      };
    }

    default:
      return state;
  }
};
