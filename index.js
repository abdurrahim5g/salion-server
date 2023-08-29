const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

/**
 *
 * Setup Middleware
 */
app.use(cors());
app.use(express.json());

/**
 * Connect with MongoDB
 */
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.undypbz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
module.exports = { client };

/**
 * Require all router from external file
 */
const useServices = require("./router/services");

/**
 *
 * Create API from external file
 */
app.use("/services", useServices);

/**
 *
 * Primary API for testing -> server is running
 */
app.get("/", (req, res) => res.send("Salion server is running"));

app.listen(port, () =>
  console.log(`Salion server is running http://localhost:${port}`)
);
