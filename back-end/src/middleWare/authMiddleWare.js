const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config;
const authMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(404).json({
        status: "ERR",
        Message: "The Authentication",
      });
    }

    if (decoded.isAdmin) {
      console.log("isAdmin:", decoded.isAdmin);
      next();
    } else {
      return res.status(404).json({
        status: "ERR",
        Message: "The Authentication",
      });
    }
  });
};
const authUSerMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
    if (err) {
      return res.status(404).json({
        status: "ERR",
        Message: "The Authentication",
      });
    }
    if (decoded?.isAdmin || decoded?.id == userId) {
      next();
    } else {
      return res.status(404).json({
        status: "ERR",
        Message: "The Authentication",
      });
    }
  });
};
module.exports = {
  authMiddleWare,
  authUSerMiddleWare,
};
