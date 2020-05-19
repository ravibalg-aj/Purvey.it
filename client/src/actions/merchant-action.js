export const CREATE_USER = "CREATE_USER";
export const mCreateUser = (user) => ({
  type: CREATE_USER,
  payload: { user },
});

export const LOGIN_USER = "LOGIN_USER";
export const mLoginUser = (user) => ({
  type: LOGIN_USER,
  payload: { user },
});

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
  type:MSET_CURRENT_USER,
  payload: { merchantData },
})