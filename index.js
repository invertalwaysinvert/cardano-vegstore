const express = require("express");
const jwt = require('jsonwebtoken');
const utils = require('./backend/utils')
const path = require("path");
var cors = require('cors');
const axios = require('axios');

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
app.use(express.urlencoded({extended: true}));
 // To parse the incoming requests with JSON payloads
app.use(express.json());

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
  var words = utils.generateRandomMnemonic(15, utils.wordList);
  res.status(200).send(words);
});

app.get("/wordlist", authenticateJWT, (req, res) => {
  res.status(200).send(utils.wordList);
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

app.post("/wallets", authenticateJWT, (req, res) => {
  var postData = req.body;
  axios.post(`${process.env.WALLET_SERVER}/v2/wallets`, postData, { headers: {
    'Content-Type': 'application/json'
  }})
  .then(function (response) {
    console.log('wallet created'+response.data.id)
    res.status(200).send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.status(500).send(error);
  })
});

app.get("/network/information", authenticateJWT, (req, res) => {
  axios.get(`${process.env.WALLET_SERVER}/v2/network/information`)
  .then(function (response) {
    res.status(200).send(response.data);
  })
  .catch(function (error) {
    res.status(500).send(error);
  })
  .then(function () {
  });

});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});