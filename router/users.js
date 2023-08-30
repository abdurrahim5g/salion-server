/**
 *
 * In this file, I have stored all the API's which related to the USER's
 */

const express = require("express");
const router = express.Router();
const { client } = require("../index");

/**
 *
 * Run all the database Operation
 */
const run = async () => {
  try {
    // Get Users collections
    const userCollections = client.db("salion").collection("users");

    // Users GET API
    router.get("/", async (req, res) => {
      const query = req.query;
      const result = await userCollections.find(query).toArray();
      res.send(result);
    });

    // User POST API
    router.post("/", async (req, res) => {
      const user = req.body;
      const result = await userCollections.insertOne(user);
      res.send(result);
    });
  } finally {
    // Finally will always execute
  }
};

run().catch(console.dir);

module.exports = router;
