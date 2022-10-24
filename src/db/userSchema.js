import { Schema, model } from "mongoose";

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  discordId: { type: String },
  discordName: { type: String },
  discordHashtag: { type: String },
  games: { type: Array, default: [] },
});

const User = model("user", userSchema, "users");

export default User;
