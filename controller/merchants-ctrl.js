const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validators/register-merchant");
const validateLoginInput = require("../validators/login-merchant");
const validateStoryInput = require("../validators/story-check");
//merchants model loader
const merchants = require("../models/merchants");
const shipping = require("../models/shipping");
const story = require("../models/story");
const item = require("../models/item");

const isEmpty = require("is-empty");

const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "purvey-it-product-images",
  keyFilename:
    "./config/purvey-it-product-images-firebase-adminsdk-z15lo-45dd66e14b.json",
});

const bucket = storage.bucket("purvey-it-product-images.appspot.com");

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

getMerchantForCustomer = async (req, res) => {
  const merchandBrandName = String(req.params.id).toLowerCase();

  merchants.findOne(
    { brandName: merchandBrandName },
    { password: 0 },
    (err, merchant) => {
      if (err) {
        res.status(400).json({ errors: err });
      }

      if (!merchant) {
        res.status(400).json({ errors: "Merchant Not found" });
      } else {
        res.json({ data: merchant });
      }
    }
  );
};

getMerchant = async (req, res) => {
  const merchantId = req.params.id;

  merchants.findOne({ _id: merchantId }, { password: 0 }, (err, merchant) => {
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

viewImage = async (req, res) => {
  const merchantId = req.params.id;

  merchants.findOne({ _id: merchantId }, { password: 0 }, (err, merchant) => {
    if (err) {
      res.status(400).json({ errors: err });
    }

    if (!merchant) {
      res.status(400).json({ errors: "Merchant Not found" });
    } else {
      // res.contentType(merchant.products[0].imageUrls[0].contentType);

      // res.send(merchant.products[0].imageUrls[0].data);
      res.json({ data: merchant.products[0].imageUrls[0].data.data });
    }
  });
};

addStory = async (req, res) => {
  // console.log(req);

  const merchantId = req.params.id;
  const body = req.body;

  if (body.imageUrl.length > 0 && isEmpty(req.files.image)) {
    merchants.findById(merchantId, (err, merchant) => {
      if (err) {
        res.status(400).json({ errors: err });
      }

      if (!merchant) {
        res.status(400).json({ errors: "Merchant Not found" });
      } else {
        const newStory = new story({
          content: body.content,
          imageUrl: body.imageUrl,
        });

        merchant.story = newStory;

        merchant
          .save()
          .then((merchant) => res.json({ data: merchant.story }))
          .catch((err) => res.status(400).json({ errors: err }));
      }
    });
  } else {
    const file = isEmpty(req.files.image) ? "" : req.files.image[0];

    const { errors, isValid } = validateStoryInput(body, file);

    if (!isValid) {
      return res.status(400).json({ errors: errors });
    }

    merchants.findById(merchantId, (err, merchant) => {
      if (err) {
        res.status(400).json({ errors: err });
      }

      if (!merchant) {
        res.status(400).json({ errors: "Merchant Not found" });
      } else {
        const blob = bucket.file(file.originalname);

        // Create writable stream and specifying file mimetype
        const blobWriter = blob.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });

        blobWriter.on("error", (err) => console.log(err));

        blobWriter.on("finish", () => {
          // Assembling public URL for accessing the file via HTTP
          const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
            bucket.name
          }/o/${encodeURI(blob.name)}?alt=media`;
          // Return the file name and its public URL

          const newStory = new story({
            content: body.content,
            imageUrl: publicUrl,
          });

          merchant.story = newStory;

          merchant
            .save()
            .then((merchant) => res.json({ data: merchant.story }))
            .catch((err) => res.status(400).json({ errors: err }));
        });

        // When there is no more data to be consumed from the stream
        blobWriter.end(file.buffer);

        // uploadAll(file).then((results) => {
        //   // console.log(results);

        // });
      }
    });
  }
};

getOrders = async (req, res) => {
  const merchantId = req.params.id;

  merchants.findOne({ _id: merchantId }, (err, merchant) => {
    if (err) {
      res.status(400).json({ errors: err });
    }
    if (!merchant) {
      res.status(404).json({ errors: "Merchant not found" });
    }

    shipping.find({ to: merchant._id }, (err, shipping) => {
      if (err) {
        res.status(400).json({ errors: err });
      }
      if (!shipping) {
        res.status(404).json({ errors: "No shipping Found" });
      } else {
        res.json({ data: shipping });
      }
    });
  });
};

module.exports = {
  createMerchant,
  doLogin,
  getMerchantForCustomer,
  getMerchant,
  viewImage,
  addStory,
  getOrders
};
