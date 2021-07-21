# Cardano Veg Store 🌽
Test of concept integration of Cardano wallet and e-commerce website. NodeJs, Angular 12.

# Description 💡
Cardano Veg Store is a template project for e-commerce integration, it mains for simplicity and not tied to proprietary technologies or platforms as much as possible.
These concepts can be reproduced in any sort of technology and programming languages, the choose for Angular and NodeJS are due fact these are the mainstream web app development platforms these days but cardano-wallet, as a rest api can be used in any type of platform that's compaible with JSON.

# Configuration ⌛️
First, you will need:

1. Install node, npm, angular cli.
1. Have a full cardano node running and synced.

## Front end 🖼

Setup the environment.ts file in Angular, change the desired backend enpoint for your backend, if you are running in the same server most likely you won't need to change it.


## Node JS backend 📦

For development only, create a .env file in backend and add two variables:
NODE_ENV=dev
WALLET_SERVER=http://<server and port of the cardano-wallet>

## Cardano Wallet, Node 🗄

Cardano wallet needs to be in the same server of your node and have access to. I recommend install it as a service. There's no much need you can do beyond the command bellow:

```
/usr/local/bin/cardano-wallet serve --listen-address '*' --testnet <path to byron json, only for testnet>byron-genesis.json --node-socket <path to socket file> --database <a path for wallet save database must have access to write>
```

In case you want mainnet change it accordingly and remove the path to byron-genesis.json.