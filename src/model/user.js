import { model, Schema } from "mongoose";

const userModel = new Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true, versionKey: false }
);

const user = new model("user", userModel);

export default user;
