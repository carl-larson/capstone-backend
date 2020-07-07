const jwt = require('jsonwebtoken')

const logger = (req, res, next) => {
  console.log(`${req.path} ${new Date().toISOString()}`)
  next()
}

const authenticate = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    req.token = bearerToken;

    next();
  } else {
    res.sendStatus(403);
  }
}
//   const header = req.headers['authorization'] || ''
//   const [ bearer, token ] = header.split(' ')

//   try {
//     const decoded = jwt.verify(token, 'secret')
//     req.user = decoded
//     next()
//   } catch(err) {
//     res.sendStatus(401)
//   }
// }

module.exports = {
  logger,
  authenticate
}