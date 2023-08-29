const express = require("express");
const router = express.Router();
const { client } = require("../index");

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

    /**
     *
     * GET All services with API
     * ============================
     * ******************************/
    router.get("/", async (req, res) => {
      const query = {};
      const result = await serviceCollection.find(query).toArray();
      res.send(result);
    });
  } finally {
    // Write your finally code hear
  }
};
run().catch(console.dir);

module.exports = router;
