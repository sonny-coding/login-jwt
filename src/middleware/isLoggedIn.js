import jwt from "jsonwebtoken";

const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("verifying...");
  if (!authHeader) {
    res.status(401).send("invalid credentials");
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_CODE, (err, _) => {
      if (err) {
        res.status(403).send("invalid credentials");
      } else {
        next();
      }
    });
  }
};

export default isLoggedIn;
