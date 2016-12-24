
import * as mongoose from 'mongoose';

export interface ITeam extends mongoose.Document {
  name: String,
  logo: String
}

export interface IGame extends mongoose.Document {
  homeTeam: ITeam,
  awayTeam: ITeam
  homeScore: Number,
  awayScore: Number
}

export interface INBASeries extends mongoose.Document {
  games: Array<IGame>
}

let teamSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  logo: String
});

let gameSchema = new mongoose.Schema({
  homeTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
  awayTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
  homeScore: Number,
  awayScore: Number
});

let nbaSeriesSchema = new mongoose.Schema({
  games: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}]
});

const models = {
  team: mongoose.model<ITeam>('Team', teamSchema),
  game: mongoose.model<IGame>('Game', gameSchema),
  nbaSeries: mongoose.model<INBASeries>('Series', nbaSeriesSchema)
}

export default models;
