//Slectors!
export const getMerchantData = (state) => {
  return state.merchant.data;
};
export const getErrors = (state) => state.merchant.errors;
export const getMConnectionError = (state) => state.merchant.connError