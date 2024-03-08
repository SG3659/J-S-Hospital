// jwt authentication protect the routes 
// middleware to validate the token 
const jwt = require("jsonwebtoken");
exports.authMiddleware = async (req, res, next) => {
  try {
    // retrieves the token from request headers
    const token = req.headers["authentication"].split(" ")[1];
    // verify the token 
    jwt.verify(token, process.env.JWT_TOCKEN, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Auth failed",
        });
      } else {
        // decode token payload and assign 
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unvalid token key pass  ",
    });
  } 
};
