import { model, Schema } from "mongoose";

const blogModel = new Schema(
  {
    title: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
    description: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const blog = new model("blogs", blogModel);

export default blog;
