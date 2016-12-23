import NbaSeries from './NbaSeries';
let keys = Object.keys(NbaSeries);

//your models
// team, game, nbaSeries
console.log(keys);



NbaSeries.team.create({
  name: 'Pistons',
  logo: 'https://s-media-cache-ak0.pinimg.com/236x/27/ca/6f/27ca6fb102cf33e5786cda0ecd3d4c4c.jpg'
});

NbaSeries.team.create({
  name: 'Blazers',
  logo: 'http://content.sportslogos.net/logos/6/239/full/826.gif'
});

let homeTeam = NbaSeries.team.findOne({name: 'Pistons'});
let awayTeam = NbaSeries.team.findOne({name: 'Blazers'});

let gameOne = new NbaSeries.nbaSeries({
  homeTeam: homeTeam,
  awayTeam: awayTeam,
  homeScore: 110,
  awayScore: 99
});

console.log(gameOne);

NbaSeries.nbaSeries.create({
  games: [gameOne]
});
