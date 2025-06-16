const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies?.token;
 // console.log(" COOKIE token:", token); //  ЛОГ

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      res.locals.user = decoded;
     // console.log(" USER from token:", decoded); //  ЛОГ
    } catch (err) {
    //  console.log(" Invalid token:", err.message); //  ЛОГ
      req.user = null;
      res.locals.user = null;
    }
  } else {
    req.user = null;
    res.locals.user = null;
  }
  next();
};

