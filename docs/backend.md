---
title: Back End documentation
layout: template
filename: backend
---

# Back end documentation

Node JS backend responsible for communication between Angular frontend and cardano node. These are the list of available endpoints so far and the expected payloads.

## POST /login

Query params:
1. email

Response:
```
{
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxx.yyyyyy"
}
```
### Description
This token is used to make all subsequent calls using as header _Bearer token_

## GET /mnemonic

_No input params_

Response:
```
["word1","word2","word3"...]
```

### Description
list of 24 words which can be used to create a wallet.

## GET /network/information

_No input params_

Response:
```
{
	"network_tip": {
		"time": "2021-07-28T11:20:44Z",
		"epoch_number": 146,
		"absolute_slot_number": 33102028,
		"slot_number": 399628
	},
	"node_era": "mary",
	"node_tip": {
		"height": {
			"quantity": 2788268,
			"unit": "block"
		},
		"time": "2021-07-28T11:20:27Z",
		"epoch_number": 146,
		"absolute_slot_number": 33102011,
		"slot_number": 399611
	},
	"sync_progress": {
		"status": "ready"
	},
	"next_epoch": {
		"epoch_start_time": "2021-07-28T20:20:16Z",
		"epoch_number": 147
	}
}
```

### Description

Returns the current network information.


## GET /wordlist

_No input params_

Response:

```
[...]
```

### Description

Returns the complete list of words.

## GET /addresses

Query params:
1. email

Response:

```
[{
"state": "used|unused",
"id":"addr_test1qrnyr....qu9nx8yucrgyedcmrzs3ekwc60xvksage7dy0259nq86dwx6",
"derivation_path": ["1852H","1815H","0H","0","0"]
},
...
]
```

### Description

Returns the list of addresses of a wallet associated to the email.

## POST /wallets

Body payload

```
{
"name": "wallet name",
"mnemonic_sentence":
[_lits of mnemonics_],
"passphrase": "1234567890",
"address_pool_gap": 20
}
```

Response sample:

```
{
  "id": "2512a00e9653fe49a44a5886202e24d77eeb998f",
  "address_pool_gap": 20,
  "balance": {
    "available": {
      "quantity": 42000000,
      "unit": "lovelace"
    },
    "reward": {
      "quantity": 42000000,
      "unit": "lovelace"
    },
    "total": {
      "quantity": 42000000,
      "unit": "lovelace"
    }
  },
  "assets": {
    "available": [
      {
        "policy_id": "65ab82542b0ca20391caaf66a4d4d7897d281f9c136cd3513136945b",
        "asset_name": "",
        "quantity": 0
      }
    ],
    "total": [
      {
        "policy_id": "65ab82542b0ca20391caaf66a4d4d7897d281f9c136cd3513136945b",
        "asset_name": "",
        "quantity": 0
      }
    ]
  },
  "delegation": {
    "active": {
      "status": "delegating",
      "target": "1423856bc91c49e928f6f30f4e8d665d53eb4ab6028bd0ac971809d514c92db1"
    },
    "next": [
      {
        "status": "not_delegating",
        "changes_at": {
          "epoch_number": 14,
          "epoch_start_time": "2020-01-22T10:06:39.037Z"
        }
      }
    ]
  },
  "name": "Alan's Wallet",
  "passphrase": {
    "last_updated_at": "2019-02-27T14:46:45.000Z"
  },
  "state": {
    "status": "ready"
  },
  "tip": {
    "absolute_slot_number": 8086,
    "slot_number": 1337,
    "epoch_number": 14,
    "time": "2019-02-27T14:46:45.000Z",
    "height": {
      "quantity": 1337,
      "unit": "block"
    }
  }
}
```

## POST /transactions

Body payload

```
{
	"passphrase": "Cardano123",
	"payments": [{
		"address": "addr_test1qr4x28ljuhxz7m7h4n2gss9tzy88260g7ukqjha7wrtr9rsc7yyk9n77fqxdvfr5hs5526lf20g38m9n60wa2d6wzl4ql4ymnd",
		"amount": {
			"quantity": 1000000,
			"unit": "lovelace"
		},
		"assets": []
	}],
	"withdrawal": "self",
	"metadata": {
		"0": {
			"string": "cardano"
		},
		"1": {
			"int": 14
		},
		"2": {
			"bytes": "2512a00e9653fe49a44a5886202e24d77eeb998f"
		},
		"3": {
			"list": [{
					"int": 14
				},
				{
					"int": 42
				},
				{
					"string": "1337"
				}
			]
		},
		"4": {
			"map": [{
					"k": {
						"string": "key"
					},
					"v": {
						"string": "value"
					}
				},
				{
					"k": {
						"int": 14
					},
					"v": {
						"int": 42
					}
				}
			]
		}
	}
}
```

Response:

```
{
	"status": "pending",
	"withdrawals": [],
	"amount": {
		"quantity": 1172893,
		"unit": "lovelace"
	},
	"inputs": [{
		"amount": {
			"quantity": 1000000000,
			"unit": "lovelace"
		},
		"address": "addr_test1qrnyr5ax0hfcnt8na6c2mhvuzt00pkp3472alew0xugpshpg7lqu9nx8yucrgyedcmrzs3ekwc60xvksage7dy0259nq86dwx6",
		"id": "f01f66a28064a8746f53dde676b20dfbb2b0e2d3f5cd8323ee0302eace43875a",
		"assets": [],
		"index": 0
	}],
	"direction": "outgoing",
	"fee": {
		"quantity": 172893,
		"unit": "lovelace"
	},
	"outputs": [{
			"amount": {
				"quantity": 1000000,
				"unit": "lovelace"
			},
			"address": "addr_test1qr4x28ljuhxz7m7h4n2gss9tzy88260g7ukqjha7wrtr9rsc7yyk9n77fqxdvfr5hs5526lf20g38m9n60wa2d6wzl4ql4ymnd",
			"assets": []
		},
		{
			"amount": {
				"quantity": 998827107,
				"unit": "lovelace"
			},
			"address": "addr_test1qq0u6yqavcqt06pa5j50eajev7tnanmhm4mqndy62hpsz4pg7lqu9nx8yucrgyedcmrzs3ekwc60xvksage7dy0259nqaqzc5p",
			"assets": []
		}
	],
	"expires_at": {
		"time": "2021-07-28T11:39:21Z",
		"epoch_number": 146,
		"absolute_slot_number": 33103145,
		"slot_number": 400745
	},
	"pending_since": {
		"height": {
			"quantity": 2788102,
			"unit": "block"
		},
		"time": "2021-07-28T09:38:38Z",
		"epoch_number": 146,
		"absolute_slot_number": 33095902,
		"slot_number": 393502
	},
	"metadata": {
		"0": {
			"string": "cardano"
		},
		"1": {
			"int": 14
		},
		"2": {
			"bytes": "2512a00e9653fe49a44a5886202e24d77eeb998f"
		},
		"3": {
			"list": [{
					"int": 14
				},
				{

					"int": 42

				},
				{
					"string": "1337"
				}
			]
		},
		"4": {
			"map": [{
					"k": {
						"string": "key"
					},
					"v": {
						"string": "value"
					}
				},
				{
					"k": {
						"int": 14
					},
					"v": {
						"int": 42
					}
				}
			]
		}
	},
	"id": "7e4cbc7d6917c0986b94e3c8e36f6f45e6fb8458ba9e3e07462509c4fe95dc8e",
	"deposit": {
		"quantity": 0,
		"unit": "lovelace"
	},
	"mint": []
}
```

### Description

Returns the transaction and state.