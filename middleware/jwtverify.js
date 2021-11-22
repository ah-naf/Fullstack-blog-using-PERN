const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  //  return res.status(400).json({ message: "Not authorized" });
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(400).json({ message: "Not authorized" });
    } else {
      const data = jwt.verify(jwtToken, process.env.JWT_SECRET);
      req.user = data.user;
    }
  } catch (error) {
    return res.status(400).json({ message: "Not authorized" });
  }

  next();
};