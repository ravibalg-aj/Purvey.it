const express = require("express");
const fs = require("fs");

//Validator
const validateProductInput = require("../validators/product-check");
//Importing model
const merchants = require("../models/merchants");
const products = require("../models/products");
const customers = require("../models/customers");

const isEmpty = require("is-empty");
const _ = require("lodash");

const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
  projectId: "purvey-it-product-images",
  keyFilename:
    "./config/purvey-it-product-images-firebase-adminsdk-z15lo-45dd66e14b.json",
});

const bucket = storage.bucket("purvey-it-product-images.appspot.com");

createProduct = async (req, res) => {
  body = req.body;
  files = req.files.imageUrls;
  merchantId = req.params.id;

  const { errors, isValid } = validateProductInput(body, files);

  if (!isValid) {
    res.status(400).json({ errors: errors });
  } else {
    merchants.findOne({ _id: merchantId }, (err, merchant) => {
      if (err) {
        res.status(400).json({ errors: err });
      }
      if (!merchant) {
        res.status(400).json({ errors: "Merchant not found!" });
      } else {
        uploadAll(files).then((results) => {
          // console.log(results);
          const newProduct = new products({
            name: body.name,
            description: body.description,
            price: body.price,
            imageUrls: results,
          });

          merchant.products.push(newProduct);

          merchant
            .save()
            .then((merchant) => res.json({ data: newProduct }))
            .catch((err) => res.status(400).json({ errors: err }));
        });
      }
    });
  }
};

uploadAll = (files) => {
  return Promise.all(files.map((file) => uploadHelper(file)));
};

uploadHelper = (file) => {
  return new Promise((resolve) => {
    // Create new blob in the bucket referencing the file
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

      resolve(publicUrl);
    });

    // When there is no more data to be consumed from the stream
    blobWriter.end(file.buffer);
  });
};

addWishlist = async (req, res) => {
  body = req.body;
  customerId = req.params.id;

  const { errors, isValid } = validateProductInput(body, body.imageUrls);

  if (!isValid) {
    res.status(400).json({ errors: errors });
  }

  if (customerId === "undefined") {
    res.status(400).json({ errors: "No Customer Id Provided!" });
  } else {
    customers.findOne({ _id: customerId }, (err, customer) => {
      if (err) {
        res.status(400).json({ errors: err });
      }
      if (!customer) {
        res.status(400).json({ errors: "Customer not found!" });
      } else {
        const newProduct = new products({
          name: body.name,
          description: body.description,
          price: body.price,
          imageUrls: body.imageUrls,
        });

        customer.cart.push(newProduct);
        customer
          .save()
          .then((customer) => res.json({ data: newProduct }))
          .catch((err) => res.status(400).json({ errors: err }));
      }
    });
  }
};

getSpecificProduct = async (req, res) => {
  const brandName = req.params.id;
  const productId = req.params.productId;

  merchants.findOne(
    { brandName: brandName },
    { password: 0 },
    (err, merchant) => {
      if (err) {
        res.status(400).json({ errors: err });
      }

      if (!merchant) {
        res.status(400).json({ errors: "Merchant Not found" });
      } else {
        var product = merchant.products.id(productId);
        if (!product) {
          res.status(400).json({ errors: "Product Not found" });
        } else {
          res.json({ data: product });
        }
      }
    }
  );
};

removeFromCart = async (req, res) => {
  const customerId = req.params.id;
  const productId = req.params.productId;

  customers.findById(customerId, (err, customer) => {
    if (err) {
      res.status(400).json({ errors: err });
    }

    if (!customer) {
      res.status(400).json({ errors: "Customer Not found" });
    } else {
      var removedProduct = _.remove(
        customer.cart,
        (product) => String(product._id) === productId
      );

      customer.markModified("cart");

      customer
        .save()
        .then((customer) => res.json({ data: removedProduct[0] }))
        .catch((err) => res.status(400).json({ errors: err }));
    }
  });
};

updateProduct = async (req, res) => {
  const productId = req.params.id;
  const body = req.body;

  const { errors, isValid } = validateProductInput(body, ["balg"]);

  if (!isValid) {
    res.status(400).json({ errors: errors });
  } else {
    merchants.findOneAndUpdate(
      { "products._id": productId },
      {
        $set: {
          "products.$.name": body.name,
          "products.$.description": body.description,
          "products.$.price": body.price,
        },
      },
      { new: true },
      (err, result) => {
        if (err) {
          res.status(400).json({ errors: err });
        }
        if (!result) {
          res.status(400).json({ errors: "Nothing Updated" });
        } else {
          res.json({
            data: result.products.filter((p) => String(p._id) === productId)[0],
          });
        }
      }
    );
  }
};
module.exports = {
  createProduct,
  addWishlist,
  getSpecificProduct,
  removeFromCart,
  updateProduct,
};
