const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    res.send('We need a token')
  } else {
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) {
        res.status(401).send(err)
      } else {
        req.userId = user.id
        next()
      }
    })
  }
}

exports.verifyJWT = verifyJWT