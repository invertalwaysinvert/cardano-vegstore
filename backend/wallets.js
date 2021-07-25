const axios = require('axios');
var dirty = require('dirty');
var db = dirty('user.db');
const utils = require('./utils');
// Get a random mnemonic list
function getMnemonic(req, res) {
    var words = utils.generateRandomMnemonic(15, utils.wordList);
    res.status(200).send(words);
}
// Get a complete set of the word list useful for autocompletion fields
function getWordList(req, res) {
    res.status(200).send(utils.wordList);
}
// Creates a wallet associated to the email
function createWallet(req, res) {
    var email = req.query.email
    if (db.get(email)) {
      var resp = {code: "wallet_already_exists", id:db.get(email).id}
      res.status(200).send(resp);
      return
    }
    var postData = req.body;
    axios.post(`${process.env.WALLET_SERVER}/v2/wallets`, postData, { headers: {
      'Content-Type': 'application/json'
    }})
    .then(function (response) {
      console.log('wallet created: '+response.data.id);
      db.set(email, {"id": response.data.id});
      res.status(200).send(response.data);
    }).catch(function (error) {
      var data = error.response.data;
      var code = data.code
      if (code) {
        if (code == "wallet_already_exists") {
            var id = data.message.match(/(\w{40})/)[0];
            res.status(200).send({code: code, id: id});
        } else {
          res.status(500).send(data);
        }
        return
      } else {
        console.log(error.response);
        res.status(500).send(error);
        return
      }    
    })
};
// Recovers wallet details from user email
function getWallet(req, res) {
    var email = req.query.email
    if (email == undefined || email == '') {
        res.status(400).send();
        return
    }
    if (db.get(email)) {
        var walletId = db.get(email).id
        axios.get(`${process.env.WALLET_SERVER}/v2/wallets/${walletId}`, { headers: {
            'Content-Type': 'application/json'
          }}).then(function (response) {
            res.status(200).send(response.data);
          }).catch(function (error) {
            var data = error.response.data;
            res.status(500).send(data);
          })
    } else {
        res.status(200).send({})
    }
}

function getAddresses(req, res) {
    var email = req.query.email
    if (email == undefined || email == '') {
        res.status(400).send();
        return
    }
    if (db.get(email)) {
        var walletId = db.get(email).id
        if (walletId) {
            axios.get(`${process.env.WALLET_SERVER}/v2/wallets/${walletId}/addresses`, { headers: {
                'Content-Type': 'application/json'
              }}).then(function (response) {
                res.status(200).send(response.data);
              }).catch(function (error) {
                var data = error.response.data;
                res.status(500).send(data);
              })
        } else {
            res.status(400).send({code:'unknown_email', error:"email not associated with any wallet."});
        }        
    } else {
        res.status(200).send({})
    }
}

module.exports = {
    createWallet,
    getMnemonic,
    getWordList,
    getWallet,
    getAddresses
}