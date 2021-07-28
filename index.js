const express = require("express");
const jwt = require('jsonwebtoken');
var wallets = require('./backend/wallets');
var transactions = require('./backend/transactions');

var dirty = require('dirty');
var db = dirty('user.db');
const path = require("path");
var cors = require('cors');
const axios = require('axios');

/**
 * App Variables
 */

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { accessTokenSecret, authenticateJWT } = require('./backend/auth-token');
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

// Init in memory key value database to store all wallet ids
db.on('load', function() {
  console.log('Dirty db memory loaded');

  db.forEach(function(key, val) {
    console.log('Found wallet: %s, val: %j', key, val);
  });
});

// Configure CORS
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

// Serve the static compiled Angular application from public directory
app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/public/index.html");
});

// just to test backend
app.get("/hearthbeat", (req, res) => {
  res.status(200).send("WHATABYTE: Food For Devs");
});

// authenticate a user generating a token necessary to all endpoints valid for 24 hours
app.post("/login", (req, res) => {
  var email = req.email;
  const accessToken = jwt.sign({ email: email }, accessTokenSecret, { expiresIn: '24h' });
  res.status(200).json({
    accessToken
  });
});

app.post("/wallets", authenticateJWT, wallets.createWallet);

app.get("/wallets", authenticateJWT, wallets.getWallet);

app.get("/addresses", authenticateJWT, wallets.getAddresses);

app.get("/mnemonic", authenticateJWT, wallets.getMnemonic);

app.get("/wordlist", authenticateJWT, wallets.getWordList);

app.get("/transactions", authenticateJWT, transactions.getTransactions);

app.post("/transactions/fees", authenticateJWT, transactions.getFees);

app.post("/transactions", authenticateJWT, transactions.createTransaction);

app.delete("/transactions", authenticateJWT, transactions.forgetTransaction);

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

db.on('drain', function() {
  console.log('All records are saved on disk now.');
});