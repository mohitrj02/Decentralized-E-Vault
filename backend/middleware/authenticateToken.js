const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Token from cookies or Authorization header
  
  if (token == null) return res.sendStatus(401); // Unauthorized if no token is provided

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = authenticateToken;
