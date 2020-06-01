const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateProductInput(data, files) {
  let errors = {};

  //convert empty fields to empty string so that validators can use them
  data.name = isEmpty(data.name) ? "" : data.name;
  data.description = isEmpty(data.description) ? "" : data.description;
  data.price = isEmpty(data.price) ? "" : data.price;

  //name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  //description checks
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  if (isEmpty(files)) {
    errors.imageUrls = "Select atleast one image";
  }

  if (!isEmpty(files)) {
    if (files.length > 4) {
      errors.imageUrls = "Only 4 photos can be added";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
