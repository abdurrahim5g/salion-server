const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Salion server is running"));

/**
 * Require all router from exptenal file
 */
const useServices = require("./router/services");

/**
 *
 * Create API from exprenal file
 */
app.use("/services", useServices);

app.listen(port, () =>
  console.log(`Salion server is running http://localhost:${port}`)
);
