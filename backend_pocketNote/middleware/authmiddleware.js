const jwt = require("jsonwebtoken"); // import jsonwebtoken

const validateToken = async (req, res, next) => {
  // function to validate token
  try {
    const bearer = req.headers.authorization;
    // console.log(bearer); /
    if (!bearer) {
      return res.status(403).send("A token is required for authentication");
    }
    const token = bearer.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded) {
      req.user = decoded; // set user in request object
      //   console.log(decoded);
      next();
    } else {
      res.status(403).send("Invalid token");
    }
  } catch (err) {
    res.status(500).json({ message: "Invalid token", error: err.message });
  }
};

module.exports = validateToken;
