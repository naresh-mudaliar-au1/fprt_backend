import { model, Schema } from "mongoose";

const followerModel = new Schema(
  {
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, versionKey: false }
);

const followers = new model("follower", followerModel);

export default followers;
