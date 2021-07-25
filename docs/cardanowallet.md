---
title: Cardano Wallet documentation
layout: template
filename: cardanowallet
---

# Cardano Wallet documentation

Cardano wallet is the most important component, its the only way your application can directly interact with Cardano blockchain, that's why we considered a special document to describe their qualities and limitations.

## Installation

First thing to consider is to install the cardano-wallet component in your node. It must reside in the same server because its heavily dependent of the blockchain. The node must be complete synchronised otherwise won't work.

The easiest way to install it we just downloaded the latest release using wget from https://github.com/input-output-hk/cardano-wallet and extract in our server.
After, we copy the cardano-wallet executable to /usr/local/bin.

But not so fast, you need to setup a service otherwise everytime you close the terminal your server will kill the process. See bellow how to run cardano wallet as service.

## Service

The cardano-wallet runs better as a service, the command to start it is like this:
cardano-wallet serve --listen-address '*' --testnet /byron-genesis.json --node-socket /...node0.socket --database /home/.../wallets-testnet

Detail of command
_serve_ means to open a port for the API, we interact using a REST API. The cli is still available but its not the way a system will use it.
_listen-address_ defines a IP to use as host, in our case, localhost suffice.
_testnet_ means we are running in test net, in case of mainnet we change this parameter.
_node-socket_ the path of your node socket file
_database_ this is a folder where the service will hold all wallets you create. You can check after in this folder all wallets created inside of sql-lite databases identified as the wallet ids.

For a full reference of all commands check this [url](https://github.com/input-output-hk/cardano-wallet/wiki/Wallet-command-line-interface)!.

The purpose of the following service is to create a start point to cardano-wallet in the server and avoid nasty bugs we found during development. We created a way to restart the service everyday, that's why we setup with RunTimeMaxSec setup to 24 hours.
There's a bug very strange we found that some wallets won't be find anymore because the worker dead, it may be for hardware limitations but when we restart the service the wallets are find again.

```
 [Unit]
    Description=ROT13 demo service
    After=network.target
    StartLimitIntervalSec=0
    
    [Service]
    Type=simple
    Restart=always
    RestartSec=1
    User=cardano
    ExecStart=/usr/local/bin/cardano-wallet serve --listen-address '*' --testnet /byron-genesis.json --node-socket /...node0.socket --database /home/.../wallets-testnet
    KillSignal=SIGINT
    SuccessExitStatus=143
    StandardOutput=syslog
    StandardError=syslog
    SyslogIdentifier=cardanowallet
    TimeoutStopSec=5
    KillMode=mixed
    RuntimeMaxSec=86400
    
    [Install]
    WantedBy=multi-user.target
```

## Trouble shooting

Common errors encountered
