// middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const bearerHeader = req.header('Authorization');

  if (!bearerHeader) {
    return res.status(401).json({ message: 'Token missing, authentication required' });
  }
  try {
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next();


    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = decoded; // Attach the decoded user data to the request object
    // next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
