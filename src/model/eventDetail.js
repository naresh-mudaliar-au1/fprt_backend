import { Schema, model } from "mongoose";

const eventDetailModel = {
  userInfo: { type: Schema.Types.ObjectId, ref: "user" },
  eventInfo: { type: Schema.Types.ObjectId, ref: "event" },
};

const eventDetail = new model("eventInfo", eventDetailModel);

export default eventDetail;
