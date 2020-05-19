const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validators/register-merchant");
const validateLoginInput = require("../validators/login-merchant");

//merchants model loader
const merchants = require("../models/merchants");

createMerchant = async (req, res) => {
  const body = req.body;

  const { errors, isValid } = validateRegisterInput(body);

  if (!isValid) {
    return res.status(400).json({ errors: errors });
  }

  merchants.findOne({ brandName: req.body.brandName }, (err, merchant) => {
    if (err) {
      return res.status(400).json({ errors: err });
    }

    if (merchant) {
      return res
        .status(400)
        .json({ errors: { brandName: "Brand name is already taken!" } });
    }

    const newMerchant = new merchants({
      brandName: String(body.brandName).toLowerCase(),
      email: body.email,
      password: body.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.status(400).json({ errors: err });
      }
      bcrypt.hash(newMerchant.password, salt, (err, hash) => {
        if (err) {
          res.status(400).json({
            errors: err,
          });
        }

        newMerchant.password = hash;
        newMerchant
          .save()
          .then((merchant) => {
            res.json({ data: merchant });
          })
          .catch((err) => res.status(400).json({ errors: err }));
      });
    });
  });
};

doLogin = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json({ errors: errors });
  }

  const email = req.body.email;
  const password = req.body.password;

  merchants.findOne({ email: email }, (err, merchant) => {
    if (err) {
      res.status(400).json({ errors: err });
    }

    if (!merchant) {
      res.status(400).json({ errors: { email: "User not found!" } });
    } else {
      bcrypt.compare(password, merchant.password).then((isMatch) => {
        if (isMatch) {
          //merchant matcher
          //creating payload
          const payload = {
            id: merchant._id,
            brandName: merchant.brandName,
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
                data: {
                  success: true,
                  token: "Bearer " + token,
                },
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
  });
};

getMerchant = async (req, res) => {
  const merchandBrandName = String(req.params.id).toLowerCase();

  merchants.findOne({ brandName: merchandBrandName },{password : 0}, (err, merchant) => {
    if (err) {
      res.status(400).json({ errors: err });
    }

    if (!merchant) {
      res.status(400).json({ errors: "Merchant Not found" });
    } else {
      res.json({ data: merchant });
    }
  });
};



module.exports = { createMerchant, doLogin, getMerchant };
