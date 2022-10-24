import { Schema, model } from "mongoose";

const gameSchema = new Schema({
  _id: Schema.Types.ObjectId,
  discordId: { type: String },
  gameId: { type: String },
  gameName: { type: String },
  gameDescr: { type: String },
  gameType: { type: String },
  gameMinPlayers: { type: Number },
  gameMaxPlayers: { type: Number },
  gameSubscr: { type: Number },
  gamePlatform: { type: String },
  gameImage: { type: String },
});

const Game = model("game", gameSchema, "games");

export default Game;
