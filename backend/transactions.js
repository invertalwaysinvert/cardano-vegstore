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
        res.status(200).send({})
    }
}

module.exports = {
    getTransactions
}