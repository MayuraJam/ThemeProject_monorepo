const rateLimit = require("express-rate-limit");

// 15 นาที จำกัด request 100 ครั้ง ต่อ 1 IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  limit: 100, // จำกัดจำนวน request ต่อ windowMs
  message: "Too many requests from this User, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    console.log('Too many requests', req.ip, options.message);
    res.status(options.statusCode).send(options.message);
  }
});

module.exports = apiLimiter;