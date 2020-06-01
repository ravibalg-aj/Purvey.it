const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateStoryInput(data, file) {
  let errors = {};

  //convert empty fields to empty string so that validators can use them
  data.content = isEmpty(data.content) ? "" : data.content;

  //name checks
  if (Validator.isEmpty(data.content)) {
    errors.content = "Story Content is required";
  }

  if (isEmpty(file)) {
    errors.imageUrl = "Select atleast one image";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
