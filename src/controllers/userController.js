import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userModel, eventDetail, eventModel } from "../model";
import { inputValidation } from "../validation";
import auth from "../middleware/auth";

const hashPassword = (password) => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);

  return hashedPassword;
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const validateBody = inputValidation.userValidationSchema.validate(
      req.body
    );

    if (validateBody.error) throw new Error(validateBody.error);

    const checkUser = await userModel.findOne({ email });
    if (checkUser) throw new Error("The Email-Id is Already Registered");

    const register = new userModel({
      name,
      email,
      password: hashPassword(password),
    });

    const registerUser = await register.save();
    if (!registerUser) throw new Error("Error Registering User");

    registerUser &&
      res
        .status(200)
        .send({ success: true, message: "You Have Been Registered" });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUser = await userModel.findOne({ email });
    if (!checkUser) throw new Error("User Does Not Exist Please Register");

    const verifyPassword = await bcrypt.compare(password, checkUser.password);

    if (!verifyPassword) throw new Error("Wrong Password");

    const secretKey = process.env.SECRETKEY || "secretkey";
    const token = verifyPassword && jwt.sign({ email }, secretKey);

    verifyPassword &&
      res
        .status(200)
        .send({ success: true, message: "Login Successful", auth: token });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { loggedUser, body } = req;
    const { password } = body;
    const { _id } = loggedUser;

    const validation = inputValidation.passwordValidation.validate(body);
    if (validation.error) throw new Error(validation.error);

    let filter = { _id };
    let update = {
      password: hashPassword(password),
    };

    let options = {
      new: true,
    };

    const updatePassword = await userModel.findOneAndUpdate(
      filter,
      update,
      options
    );

    updatePassword &&
      res
        .status(200)
        .send({ success: true, message: "Password Updated Successfully" });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};

const followUser = async (req, res) => {
  try {
    const { loggedUser, body } = req;
    const { password } = body;
    const { _id } = loggedUser;

    
    res.status(200).send({ success: true, followerCount: 1 });
  } catch (error) {
    res.status(400).send({ success: false, Error: error.message });
  }
};
export default { signup, login, updatePassword, followUser };
