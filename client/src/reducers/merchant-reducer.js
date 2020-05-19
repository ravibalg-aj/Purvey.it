import {
  CREATE_USER,
  LOGIN_USER,
  LOGOUT_USER,
  USER_LOADING_SUCCESS,
  USER_LOADING_PROGRESS,
  MGET_ERRORS,
  MCONN_ERROR,
  MSET_CURRENT_USER
} from "../actions/merchant-action";
const isEmpty = require("is-empty");

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  data: {},
  errors: {},
  connError: {},
};

export const merchant = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER: {
      const { user } = payload;
      return { ...state, data: user };
    }

    case LOGIN_USER: {
      const { user } = payload;
      return {
        ...state,
        isAuthenticated: !isEmpty(user),
        data: { _id: user.id, brandName: user.brandName },
      };
    }

    case LOGOUT_USER: {
      return state;
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
      const {err} = payload;
      return {
        ...state,
        connError: err,
      };
    }

    case MSET_CURRENT_USER:{
      const{merchantData} = payload;
      return{
        ...state,
        isAuthenticated:true,
        data:merchantData
      }
    }

    default: {
      return state;
    }
  }
};
