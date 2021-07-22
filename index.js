const express = require("express");
const bip39 = require("bip39");
const path = require("path");
var cors = require('cors');
const axios = require('axios');

/**
 * App Variables
 */

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const port = process.env.PORT || "80";

app.use(express.static(process.cwd()+"/public/", { maxAge: "365d" }));

var corsOptions = {
  origin: process.env.FRONT_END,
  optionsSuccessStatus: 200
}


app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/public/index.html");
});

app.get("/hearthbeat", (req, res) => {
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

app.get("/network/information", (req, res) => {
  axios.get(`${process.env.WALLET_SERVER}/v2/network/information`)
  .then(function (response) {
    // handle success
    console.log(response.data);
    res.status(200).send(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
  });

});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});