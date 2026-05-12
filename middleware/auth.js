import jwt from "jsonwebtoken";

const JWT_SECRET = "contacthub_secret_key";

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/login");
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.redirect("/login");
  }
};


export default auth;