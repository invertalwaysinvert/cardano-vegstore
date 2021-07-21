const express = require("express");
const bip39 = require("bip39");
const path = require("path");
var cors = require('cors')

/**
 * App Variables
 */

 const app = express();
 const port = process.env.PORT || "8000";

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

 app.get("/", (req, res) => {
    res.status(200).send("WHATABYTE: Food For Devs");
  });

  app.get("/mnemonic", cors(corsOptions), (req, res) => {
    bip39.setDefaultWordlist('english')
    const mnemonic1 = bip39.generateMnemonic();
    const mnemonic2 = bip39.generateMnemonic();
    const array1 = mnemonic1.split(' ');
    const array2 = mnemonic2.split(' ');
    const finalMnemonic = array1.concat(array2);
    res.status(200).send(finalMnemonic);
  });

  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });