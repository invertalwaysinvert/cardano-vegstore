const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACESSTOKEN_SECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              console.log(err)
              return res.sendStatus(403);
          }
          req.user = user;
          next();
      });
  } else {
      console.log('No auth header 401')
      res.sendStatus(401);
  }
};

module.exports = {
    authenticateJWT,
    accessTokenSecret
};