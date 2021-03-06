export const getCustomer = (state) => state.customer;
export const getMerchantData = (state) => state.customer.merchantData;
export const getMerchantProducts = (state) =>
  state.customer.merchantData.products;
export const getCustomerData = (state) => state.customer.data;
export const getErrors = (state) => state.customer.errors;
export const getCConnectionError = (state) => state.customer.connError;
export const getProductView = (state) => state.customer.productView;
export const getCart = (state) => state.customer.data.cart;
export const getOrderDetails = (state) => state.customer.orderDetails;
