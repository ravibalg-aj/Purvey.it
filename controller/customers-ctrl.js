const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validators/register-customer");
const validateLoginInput = require("../validators/login-merchant");
const isEmpty = require("is-empty");

//merchants model loader
const customers = require("../models/customers");
const shipping = require("../models/shipping");
const merchants = require("../models/merchants");

createCustomer = async (req, res) => {
  body = req.body;
  merchantId = req.params.id;

  const { errors, isValid } = validateRegisterInput(body);

  if (!isValid) {
    return res.status(400).json({ errors: errors });
  }

  merchants.findOne({ _id: merchantId }, (err, merchant) => {
    if (err) {
      res.status(400).json({ errors: err });
    }

    if (!merchant) {
      res.status(400).json({ errors: "Merchant not found" });
    } else {
      customers.findOne(
        { $and: [{ email: body.email }, { merchantId: merchantId }] },
        (err, customer) => {
          if (err) {
            res.status(400).json({ errors: err });
          }

          if (customer) {
            res
              .status(400)
              .json({ errors: { email: "Customer already exists" } });
          } else {
            const newCustomer = new customers({
              name: body.name,
              email: body.email,
              password: body.password,
              merchantId: merchant.brandName,
            });

            bcrypt.genSalt(10, (err, salt) => {
              if (err) {
                res.status(400).json({ errors: err });
              }
              bcrypt.hash(newCustomer.password, salt, (err, hash) => {
                if (err) {
                  res.status(400).json({
                    errors: err,
                  });
                }

                newCustomer.password = hash;
                newCustomer
                  .save()
                  .then((customer) => res.json({ data: customer }))
                  .catch((err) => res.status(400).json({ errors: err }));
              });
            });
          }
        }
      );
    }
  });
};

doLogin = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  const merchantId = req.params.id;
  if (!isValid) {
    return res.status(400).json({ errors: errors });
  }

  const email = req.body.email;
  const password = req.body.password;
  merchants.findOne({ _id: merchantId }, (err, merchant) => {
    if (err) {
      res.status(400).json({ errors: err });
    } else {
      if (!merchant) {
        res.status(400).json({ errors: { email: "Merchant not found!" } });
      } else {
        customers.findOne(
          { $and: [{ email: email }, { merchantId: merchant.brandName }] },
          (err, customer) => {
            if (err) {
              res.status(400).json({ errors: err });
            } else {
              if (!customer) {
                res
                  .status(400)
                  .json({ errors: { email: "Customer not found!" } });
              }
              if (!isEmpty(customer)) {
                bcrypt.compare(password, customer.password).then((isMatch) => {
                  if (isMatch) {
                    //merchant matcher
                    //creating payload
                    const payload = {
                      id: customer._id,
                      email: customer.email,
                      brandName: customer.merchantId,
                    };

                    jwt.sign(
                      payload,
                      keys.secretOrKey,
                      {
                        expiresIn: 31556926, // 1 year in seconds
                      },
                      (err, token) => {
                        if (err) {
                          res.status(400).json({ errors: err });
                        }

                        res.json({
                          success: true,
                          token: "Bearer " + token,
                        });
                      }
                    );
                  } else {
                    return res
                      .status(400)
                      .json({ errors: { password: "Password incorrect" } });
                  }
                });
              }
            }
          }
        );
      }
    }
  });
};

getMerchantCustomers = async (req, res) => {
  merchantId = req.params.id;

  customers.find(
    { merchantId: merchantId },
    { cart: 0, password: 0 },
    (err, customers) => {
      if (err) {
        res.status(400).json({ errors: err });
      }

      if (!customers) {
        res.status(400).json({ errors: "Merchant not found!" });
      }
      res.json({ data: customers });
    }
  );
};

getCustomer = async (req, res) => {
  customerId = req.params.id;

  customers.findById({ _id: customerId }, { password: 0 }, (err, customer) => {
    if (err) {
      res.status(400).json({ errors: err });
    }

    if (!customer) {
      res.status(400).json({ errors: "Customer not found" });
    } else {
      res.json({ data: customer });
    }
  });
};

getOrders = async (req, res) => {
  const merchantId = req.params.id;
  const customerId = req.params.customerId;

  merchants.findOne({ brandName: merchantId }, (err, merchant) => {
    if (err) {
      res.status(400).json({ errors: err });
    }
    if (!merchant) {
      res.status(404).json({ errors: "Merchant not found" });
    }

    shipping.find(
      { $and: [{ to: merchant._id }, { from: customerId }] },
      (err, shipping) => {
        if (err) {
          res.status(400).json({ errors: err });
        }
        if (!shipping) {
          res.status(404).json({ errors: "No shipping Found" });
        } else {
          res.json({ data: shipping });
        }
      }
    );
  });
};

module.exports = {
  createCustomer,
  doLogin,
  getMerchantCustomers,
  getCustomer,
  getOrders,
};
