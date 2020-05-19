const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateShippingInput(data) {
  let errors = {};

  //convert empty fields to empty string so that validators can use them
  data.from = isEmpty(data.from) ? "" : data.from;
  data.to = isEmpty(data.to) ? "" : data.to;
  data.tokenId = isEmpty(data.tokenId) ? "" : data.tokenId;
  data.shippingAddress = isEmpty(data.shippingAddress)
    ? ""
    : data.shippingAddress;
  data.totalPrice = isEmpty(data.totalPrice) ? "" : data.totalPrice;
  //name checks
  if (Validator.isEmpty(data.from)) {
    errors.name = "From field is required";
  }

  //description checks
  if (Validator.isEmpty(data.to)) {
    errors.description = "To field is required";
  }

  if (Validator.isEmpty(data.tokenId)) {
    errors.price = "Status field is required";
  }

  if (Validator.isEmpty(data.shippingAddress)) {
    errors.shippingAddress = "Shipping Address field is required";
  }

  if (Validator.isEmpty(String(data.totalPrice))) {
    errors.totalPrice = "Total price field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
