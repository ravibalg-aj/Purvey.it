require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const passport = require("passport");
const merchantRoute = require("./routes/merchant-routes");
const customerRoute = require("./routes/customer-route");
const productRoute = require("./routes/products-route");
const shippingRoute = require("./routes/shipping-route");

const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

//Multer middleware
// app.use(multer);

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api", merchantRoute);
app.use("/api", customerRoute);
app.use("/api", productRoute);
app.use("/api", shippingRoute);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
