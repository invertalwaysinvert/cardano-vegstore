const express = require("express");
const bip39 = require("bip39");
const path = require("path");

/**
 * App Variables
 */

 const app = express();
 const port = process.env.PORT || "8000";


 app.get("/", (req, res) => {
    res.status(200).send("WHATABYTE: Food For Devs");
  });

  app.get("/mnemonic", (req, res) => {
    const mnemonic = bip39.generateMnemonic()
    res.status(200).send(mnemonic.split(' '));
  });

  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });