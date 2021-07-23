## Welcome to Cardano Vegstore

Welcome! 
😀This is our project document pages for Cardano Vegstore, we explain technically how it works, what are the main parts and how can you by your own means, create your own Cardano enginered app! 
Isn't great? Yes but remember, there are several things to be concerned, let's not forget that:

 1. Wallets are sensitive, security is a must always otherwise our customers, Cardano community overall and even newcomers, looking for a different experience can be very upset.
 2. This project is not designed to be used AS IS, you have to change it, adapt, remove what's not needed and figure out how to make it work in your own environment.
 3. We are setting up a use case for cardano-wallet, a software crucial to this type of application and developed by IOHK. We only can go in terms of features the much they can allow us to go.
 4. This is not a commercial product but the code base can be used as much to help and facilitate new business to create and thrive, why not? We are here for the money nonetheless. At same time, we can't be found accountable in case these business fails to apply some security restriction, this is not on our responsibility to guarantee any type of support, paid or for free to anybody willing to use this piece of code.

If you are willing to make part of this journey, check out the [code at GitHub](https://github.com/cheffNFT/cardano-vegstore) and let's get started!
  
### Pre requisites

In order to help the development of this project you will need a set of tools and skills, we are trying to enumerate here all the basics but know they are not the complete list and everybody should learn here and there new tricks.

 1. Angular development, typescript and all related, know enough about angular-cli is needed.
 2. NodeJS, express mainly.
 3. JSON, JSONWebtokens.
 4. BIP39 standard and JS library related.
 5. Regular web standards like HTML, CSS.
 6. Bootstrap knowledge is desired but this is well documented and easy to learn.
 7. Cardano blockchain basics, drafting transactions, staking pool basic operation is required for your development and production environment.
 8. Linux operational system is a must, otherwise you can't run anything at all. I suggest you to have a PC installed with some Linux distro or access to a server of your own. I can't give you access to my node, sorry about that.✌️
 9. Some JavaScript IDE like VSCode, its free and do the job.
 10. Postman for testing the API calls, free tool easily downloaded.
 11. Docker in case you want to run a node in a container.

These are the basics, more often some other things we may need but this is the fundamental stuff for this project. 

### Starting the development environment

  The dev environment is divided in frontend Angular, the backend Node JS and finally the Cardano node that operates the cardano-wallet API.
  For obvious reasons, we don't want a web client directly calling the Cardano node, that's why we added a new layer of security and to provide useful features as a backend.
  This application doesn't have a database, we are wanting it to make simple, easy to replicate therefore there are no databases here. Think that you'll probably need one in your final project and I'd recommend you try Postgres Database, its robust and reliable, but in this project, there's no such thing of databases.

 1. Check out the project source from main repository, this is the latest stable version of the project. You can see that backend is in fact, in the root folder, we had to do that because of Heroku app won't run a node js application inside a sub folder. You feel free to do whatever you want in your own implementation, this is not required.
 2. Setup the environment variables in a .env file: 
NODE_ENV=dev
WALLET_SERVER=http://<ip and port your node>
FRONT_END=<frontend dev ip and port, can be http://localhost:4200>
PORT=<node port often 8000>
ACESSTOKEN_SECRET=<the token access secret, a password stored in your server used to authenticate the requests>
Remember, keep that ACESSTOKEN_SECRET safe otherwise in production you can have some nasty surprises. 😿
 3. For the frontend, you have two files namely environment.ts and environment.prod.ts. For obvious reasons, environment.ts is only for development and environment.prod.ts is used when the application is built. These are the variables on them: 
production:  false,
client_id:  <google client id>,
node_url:  <backend endpoint>
Client id is the google authenticator client id, in case you want your application is integrated with Google Oauth which in most cases is good enough, you have to set your own at https://console.cloud.google.com. Right now you can just use ours, remember that if the project runs in a different server, you will have an ugly error screen.
 4. Pretty much that's it. Run npm install in both, first on root folder of the project after again inside /cardanoshop folder, this is the front end folder. Open a terminal, execute _npm start_ will be displayed a message like this: 
 ```
 Listening to requests on http://localhost:8000
```
Your backend is up and running to accept requests, now open another terminal without closing the current one, go to /cardanoshop folder in your project and run _ng serve --open_ this will compile, run the frontend and finally browser is opened.
If everything is ok you can see the Cardano Veg Store webpage like that:
![cardano veg store page](https://raw.githubusercontent.com/cheffNFT/cardano-vegstore/main/docs/screen1.png)

### Reference and useful links

This is a list of useful content to help you understand the technology in this project.

 1. [Angular tour of heroes](https://angular.io/tutorial)
 2. [Cardano wallet API docs](https://input-output-hk.github.io/cardano-wallet/api/edge/#tag/Wallets)
 3. [Angular Bootstrap](https://ng-bootstrap.github.io/#/home)
 4. [BIP39 library](https://www.npmjs.com/package/bip39)
 5. [JSON Webtokens](https://www.npmjs.com/package/jsonwebtoken)

### Support or Contact

Having trouble with the project? Check out our [discord channel](https://discord.gg/g9Hpwwne5Q) or [contact me by email](cheffwallets@gmail.com) and we’ll help you sort it out.
|  |  |
|--|--|
|  |  |
