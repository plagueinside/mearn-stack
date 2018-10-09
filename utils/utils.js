const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

exports.generateJWT = () => {
  console.log(secretKey);
}
