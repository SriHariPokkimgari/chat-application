import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  roomId: {
    type: String,
    require: true,
  },
  text: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  joinUser: {
    type: String,
  },
  timeStamp: {
    type: String,
    require: true,
  },
});

const Message = model("Message", messageSchema);
export default Message;
