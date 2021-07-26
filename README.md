![](https://img.shields.io/badge/Angular-11-informational?style=flat&logo=Angular&logoColor=white&color=fc3903)
![](https://img.shields.io/badge/Bootstrap-5-informational?style=flat&color=03cafc)
![](https://img.shields.io/badge/NodeJS-14-informational?style=flat&color=03fc1c)
![](https://img.shields.io/badge/CardanoWallet-v20210611-informational?style=flat&color=fc03f4)

# Cardano Veg Store 🌽
Test of concept integration of Cardano wallet and e-commerce website. NodeJs, Angular 11. There are several things to consider in this project, so consider this as a reference, not a full fledge application. Some concerns about security must be addressed first and we can't be accountable for any misuse of the code. The intention of the pet project is to serve an educational purpose.


# Description 💡
Cardano Veg Store is a template project for e-commerce integration, it mains for simplicity and is not tied to proprietary technologies or platforms as much as possible.
These concepts can be reproduced in any sort of technology and programming languages, the choice for Angular and NodeJS are due fact these are the mainstream web app development platforms these days but Cardano-wallet, as a rest API can be used in any type of platform that's compatible with JSON.
The Cardano-wallet is a very useful application created by IOHK and allows all important features related to wallets like creation, recovering, transaction, sending, and receiving ADA.
The most important about Cardano-wallet it runs stand-alone in a server exposing an endpoint as REST API, we can build front ends around it that allow end-users to have multiple clients, web or mobile to these wallets.

Any website that wants to connect must allow your users to first authenticate, after that, we can match a previously created wallet using seed phrase and password encrypted in case of any database leak that could be potentially disastrous.

After customers recover or create the wallet we can store this information, for purposes of simplicity, this pet project doesn't have a database for such a purpose.
The Angular front end only communicates with the NodeJS backend, it allows another layer of security not allowing any direct access to our wallet server, we can even configure a firewall to not answer any requests outside the desired IP we want.

The NodeJS backend calls Cardano-wallet, can be responsible for a simple authentication mechanism validating some users we allow and redirecting responses.

For complete and updated documentation please check our [Github Pages](https://cheffnft.github.io/cardano-vegstore/)

# Configuration ⌛️
First, you will need:

1. Install node, npm, angular cli.
1. Have a full cardano node running and synced.
1. Have a google developer account if you want to integrate with Google authentication server. In this example, we only set up to our servers in the demo.

## Front end 🖼

Setup the environment.ts file in Angular, change the desired backend endpoint for your backend, if you are running in the same server most likely you won't need to change it.
The envirnoment.ts will define the google key for OAuth, so you are required to change it for your own otherwise won't work in your server.

## Node JS backend 📦

For development only, create a .env file in backend and add two variables:
NODE_ENV=dev
WALLET_SERVER=http://<server and port of the cardano-wallet>

## Cardano Wallet, Node 🗄

Cardano wallet needs to be in the same server as your node and have access to. I recommend installing it as a service. There's no much need you can do beyond the command bellow:

```
/usr/local/bin/cardano-wallet serve --listen-address '*' --testnet <path to byron json, only for testnet>byron-genesis.json --node-socket <path to socket file> --database <a path for wallet save database must have access to write>
```

In case you want mainnet change it accordingly and remove the path to byron-genesis.json.
