const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1];
  if (token) {

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userID = decoded.userID;
      req.body.createdAt = new Date();
      next();
    } catch (err) {
        res.send(err);
    }
  } else {
    res.send({ msg: "login again" });
  }
};

module.exports = {
  authenticate,
};
