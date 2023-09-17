const jwt = require('jsonwebtoken');

function isTokenPresentInHeader(req) {
  const header = req.headers.authorization;
  if (!header) throw new Error('no token provided.');
  return header;
}

function getToken(header) {
  const bearer = header.split(' ');
  if (bearer.length < 2) throw new Error('invalid token');
  const token = bearer[1];
  return token;
}
// Middleware to authenticate users using JWT
const authenticateUser = (req, res, next) => {
  try {
    // Check if a token is included in the request headers
    const header = isTokenPresentInHeader(req);
    const token = getToken(header);

    // Verify the token using your JWT secret key
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) throw new Error(error.message);
      if (!decoded?.id) throw new Error('userId not found in jwt');

      // Attach the decoded user data to the request for further use
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(403).json({
      code: '000UN',
      message: error.message,
    });
  }
};

module.exports = { authenticateUser };
