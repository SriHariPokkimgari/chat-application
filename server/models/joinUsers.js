import { Schema, model } from "mongoose";

const joinUsersSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  roomName: {
    type: String,
    require: true,
  },
});

const JoinUsers = model("joinUsers", joinUsersSchema);

export default JoinUsers;
