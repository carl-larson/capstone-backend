const jwt = require('jsonwebtoken')

const logger = (req, res, next) => {
  console.log(`${req.path} ${new Date().toISOString()}`)
  next()
}

const authenticate = (req, res, next) => {
//   const bearerHeader = req.headers['authorization'];
//   console.log(bearerHeader);
//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(" ");

//     const bearerToken = bearer[1];

//     req.token = bearerToken;

//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }
  const header = req.headers['authorization'] || ''
  const [ bearer, token ] = header.split(' ')
  console.log(token);

  try {
    const decoded = jwt.verify(token, 'secret')
    req.username = decoded
    res.send(`Welcome ${decoded.username}!`)
    next()
  } catch(err) {
    res.sendStatus(401)
  }
}

module.exports = {
  logger,
  authenticate
}