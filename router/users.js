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

      const userCount = await userCollections.countDocuments({
        email: user.email,
      });

      if (userCount > 0) {
        return res.send({
          acknowledged: true,
          message: "User already inserted.",
        });
      }

      const result = await userCollections.insertOne(user);
      res.send(result);
    });

    // User make admin
    router.patch("/make-admin", async (req, res) => {
      const query = req.query;
      const updateDoc = {
        $set: {
          role: "admin",
        },
      };
      const options = { upsert: true };
      const updateRole = await userCollections.updateOne(
        query,
        updateDoc,
        options
      );
      res.send(updateRole);
    });
  } finally {
    // Finally will always execute
  }
};

run().catch(console.dir);

module.exports = router;
