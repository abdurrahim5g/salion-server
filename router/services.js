const express = require("express");
const router = express.Router();
const { client } = require("../index");

router.get("/", (req, res) => res.send("All services"));

/**
 *
 * Upload service image
 */
const run = async () => {
  try {
    const serviceCollection = client.db("salion").collection("services");

    // Insert service on database with post API
    router.post("/", async (req, res) => {
      const serviceDocs = req.body;
      const result = await serviceCollection.insertOne(serviceDocs);
      res.send(result);
    });
  } finally {
    // Write your finally code hear
  }
};
run().catch(console.dir);

module.exports = router;
