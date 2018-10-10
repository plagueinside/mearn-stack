const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

exports.generateJWT = () => {
  return jwt.sign({}, secretKey, { expiresIn: '1h' });
}
