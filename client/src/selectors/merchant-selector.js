//Slectors!
export const getMerchantData = (state) => {
  return state.merchant.data;
};
export const getErrors = (state) => state.merchant.errors;
export const getMConnectionError = (state) => state.merchant.connError;
export const getMerchant = (state) => state.merchant;
export const getProducts = (state) => state.merchant.data.products;
export const getMerchantStory = (state) => state.merchant.data.story;
export const getOrderDetails = (state) => state.merchant.orderDetails;
