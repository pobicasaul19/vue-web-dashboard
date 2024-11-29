const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(app) {
  // Define the verifyToken middleware
  const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
      const bearerToken = bearerHeader.split(' ')[1];
      jwt.verify(bearerToken, 'archTestKey', (err, authData) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden access." });
        }
        req.authData = authData;
        next();
      });
    } else {
      return res.status(401).json({ message: "Unauthorized." });
    }
  };

  app.use(verifyToken);
  return app;
};