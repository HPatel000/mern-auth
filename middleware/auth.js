const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  // get token from the header
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No Token Found! Authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
}