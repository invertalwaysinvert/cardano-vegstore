const express = require("express");
const jwt = require('jsonwebtoken');
const bip39 = require("bip39");
const path = require("path");
var cors = require('cors');
const axios = require('axios');
bip39.setDefaultWordlist('english');
/**
 * App Variables
 */

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { accessTokenSecret, authenticateJWT } = require('./auth-token');
const app = express();
const port = process.env.PORT || "80";

app.use(express.static(process.cwd()+"/public/", { maxAge: "365d" }));

var corsOptions = {
  origin: process.env.FRONT_END,
  optionsSuccessStatus: 200
}

app.use(cors({origin: [
  'http://127.0.0.1',
  'http://localhost:4200'
]}));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/public/index.html");
});

app.get("/hearthbeat", (req, res) => {
  res.status(200).send("WHATABYTE: Food For Devs");
});

app.post("/login", (req, res) => {
  var email = req.email;
  const accessToken = jwt.sign({ email: email }, accessTokenSecret, { expiresIn: '24h' });
  res.status(200).json({
    accessToken
  });
});

app.get("/mnemonic", authenticateJWT, (req, res) => {
  const mnemonic1 = bip39.generateMnemonic();
  const mnemonic2 = bip39.generateMnemonic();
  const array1 = mnemonic1.split(' ');
  const array2 = mnemonic2.split(' ');
  const finalMnemonic = array1.concat(array2);
  res.status(200).send(finalMnemonic);
});

app.post("/seed", authenticateJWT, (req, res) => {
  var mnemonic = req.mnemonic;
  var password = req.password;
  bip39.mnemonicToSeed(mnemonic, password)
    .then(function (bytes) { 
      var result = bytes.toString('hex');
      console.log(result);
      res.status(200).send(result);
    });
});

app.post("/validatemnemonic", authenticateJWT, (req, res) => {
  var mnemonic = req.mnemonic;
  var password = req.password;
  bip39.validateMnemonic(mnemonic, password)
    .then(function (validation) { 
      console.log(validation);
      res.status(200).send(validation);
    });
});

app.get("/network/information", authenticateJWT, (req, res) => {
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