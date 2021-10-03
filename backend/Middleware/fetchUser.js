var jwt = require("jsonwebtoken");
const JWT_SECRET = "akanaspro";
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using Valid Token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate using Valid Token" });
  }
};

module.exports = fetchUser;
