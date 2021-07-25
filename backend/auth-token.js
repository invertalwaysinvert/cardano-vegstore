const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACESSTOKEN_SECRET;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              console.log(err);
              return res.status(403).send('token expired');
          } else {
            req.user = user;
            next();
          }
      });
  } else {
      console.log('No auth header 401')
      res.status(401);
  }
};

module.exports = {
    authenticateJWT,
    accessTokenSecret
};