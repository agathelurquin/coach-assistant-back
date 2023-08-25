const { expressjwt: jwt } = require("express-jwt");
const { User } = require("../models/User.model");
// Instantiate the JWT token validation middleware
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}

async function isCoach(req, res, next) {
  try {
    const foundUser = await User.findById(req.payload._id);
    if (foundUser.role === "coach") {
      next();
    } else {
      return res.status(401).json({ message: "User not authorized" });
    }
  } catch (error) {
    next(error);
  }
}
// isAdmin
// isClient

// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
  isCoach,
};
