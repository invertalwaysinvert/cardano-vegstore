const axios = require('axios');
var dirty = require('dirty');
var db = dirty('user.db');
const utils = require('./utils');

// Recovers wallet transactions
function getTransactions(req, res) {
    var email = req.query.email
    if (email == undefined || email == '') {
        res.status(400).send();
        return
    }
    if (db.get(email)) {
        var walletId = db.get(email).id
        axios.get(`${process.env.WALLET_SERVER}/v2/wallets/${walletId}/transactions`, { headers: {
            'Content-Type': 'application/json'
          }}).then(function (response) {
            res.status(200).send(response.data);
          }).catch(function (error) {
            var data = error.response.data;
            res.status(500).send(data);
          })
    } else {
        res.status(400).send({'code':'usernotfound','message':'user not found'})
    }
}

function createTransaction(req, res) {
  var email = req.query.email
    if (email == undefined || email == '') {
        res.status(400).send();
        return
    }
    if (db.get(email)) {
      var walletId = db.get(email).id
      var postData = req.body;
      axios.post(`${process.env.WALLET_SERVER}/v2/wallets/${walletId}/transactions`, postData, { headers: {
          'Content-Type': 'application/json'
        }}).then(function (response) {
          res.status(200).send(response.data);
        }).catch(function (error) {
          var data = error.response.data;
          res.status(500).send(data);
        })
    } else {
      res.status(400).send({'code':'usernotfound','message':'user not found'})
    }
}

module.exports = {
    getTransactions,
    createTransaction
}