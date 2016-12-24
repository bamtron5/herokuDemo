import NbaSeries from './NbaSeries';
import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import * as colors from 'colors';
let oneAtATime = require('promise-one-at-a-time'); //promises that go one at a time
let keys = Object.keys(NbaSeries);

//drop the db
mongoose.connection.db.dropDatabase();

//your models
// team, game, nbaSeries
console.log('seed keys\n'.yellow, pj(keys));

//block vars when promises resolve
let teams = null;
let games = null;
let series = null;

function createTeams() {
  return Promise.all([
    NbaSeries.team.create({
      name: 'Pistons',
      logo: 'https://s-media-cache-ak0.pinimg.com/236x/27/ca/6f/27ca6fb102cf33e5786cda0ecd3d4c4c.jpg'
    }),
    NbaSeries.team.create({
      name: 'Blazers',
      logo: 'http://content.sportslogos.net/logos/6/239/full/826.gif'
    })
  ]);
}

function createGames() {
  return Promise.all([
    NbaSeries.game.create({
      homeTeam: teams[0],
      awayTeam: teams[1],
      homeScore: 110,
      awayScore: 99
    })
  ])
}

function createSeries() {
  return Promise.all([
    NbaSeries.nbaSeries.create({
      games: _.map(games, (game) => game)
    })
  ]);
}

let promiseQue = [
  () => new Promise((resolve, reject) => {
    createTeams().then((result) => {
      console.log('i got a list of teams\n'.yellow, pj(result));
      teams = result;
      resolve(result);
    }).catch((err) => { throw new Error(err) });
  }),
  () => new Promise((resolve, reject) => {
    createGames().then((result) => {
      console.log('then a list of games\n'.yellow, pj(result));
      games = result;
      resolve(result);
    }).catch((err) => { throw new Error(err) });
  }),
  () => new Promise((resolve, reject) => {
    createSeries().then((result) => {
      console.log('then a list of series\n'.yellow, pj(result));
      series = result;
      resolve(result);
    }).catch((err) => { throw new Error(err) });
  })
];

//consider this the `INIT` of the script
oneAtATime(promiseQue).then((result) => {
  console.log('\n-==seed script is finished==-\n'.yellow);
  //an example of a populated one to many
  NbaSeries.nbaSeries
    .findOne({_id: series[0]._id})
    .populate('games')
    .exec((err, val) => {
      if (err) throw new Error(err);
      console.log('populated one to many of a series\n'.yellow, pj(val));
    })
    .catch((err) => { throw new Error(err) });
}).catch((err) => { throw new Error(err) });

//readable json
function pj(data) {
  return '\n' + JSON.stringify(data, null, 2).green + '\n';
}
