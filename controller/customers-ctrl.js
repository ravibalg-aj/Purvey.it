const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validators/register-customer");
const validateLoginInput = require("../validators/login-merchant");

//merchants model loader
const customers = require("../models/customers");

createCustomer = async (req, res) => {
  body = req.body;
  merchantId = req.params.id;

  const { errors, isValid } = validateRegisterInput(body);

  if (!isValid) {
    return res.status(400).json({ errors: errors });
  }

  customers.findOne(
    { $and: [{ email: body.email }, { merchantId: merchantId }] },
    (err, customer) => {
      if (err) {
        res.status(400).json({ errors: err });
      }

      if (customer) {
        res.status(400).json({ errors: { email: "Customer already exists" } });
      } else {
        const newCustomer = new customers({
          name: body.name,
          email: body.email,
          password: body.password,
          merchantId: merchantId,
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
};

doLogin = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  const merchantId = req.params.id;
  if (!isValid) {
    return res.status(400).json({ errors: errors });
  }

  const email = req.body.email;
  const password = req.body.password;

  customers.findOne(
    { $and: [{ email: req.body.email }, { merchantId: merchantId }] },
    (err, customer) => {
      if (err) {
        res.status(400).json({ errors: err });
      } else {
        if (!customer) {
          res.status(400).json({ errors: { email: "Customer not found!" } });
        } else {
          bcrypt.compare(password, customer.password).then((isMatch) => {
            if (isMatch) {
              //merchant matcher
              //creating payload
              const payload = {
                id: customer._id,
                email: customer.name,
                merchantId: customer.merchantId,
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
};

getMerchantCustomers = async (req, res) => {
  merchantId = req.params.id;

  customers.find(
    { merchantId: merchantId },
    { wishlist: 0 },
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

  customers.findById({ _id: customerId }, (err, customer) => {
    if (err) {
      res.status(400).json({ errors: err });
    }

    if (!customer) {
      res.status(400).json({ errors: "Customer not found" });
    }

    res.json({ data: customer });
  });
};

module.exports = { createCustomer, doLogin, getMerchantCustomers, getCustomer };
