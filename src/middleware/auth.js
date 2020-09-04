import jwt from "jsonwebtoken";
import { userModel } from "../model";

const auth = async (req, res, nxt) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Access denied. No token provided");

    const token =
      authorization && authorization.startsWith("Bearer ")
        ? authorization.slice(7, authorization.length)
        : null;

    const mySecretKey = process.env.SECRETKEY || "mysecretkey";

    const verifyToken = jwt.verify(token, mySecretKey);

    const email = verifyToken.email;

    let getUser = await userModel.findOne({ email });
    if (!getUser) throw new Error("Token Not Valid");

    const { name, _id } = getUser;

    getUser = {
      name,
      email,
      _id,
    };
    console.log('getUser', getUser)
    req.loggedUser = getUser;
    nxt();

  } catch (error) {
    res.status(403).send({ Error: error.message });
  }
};

export default auth;
