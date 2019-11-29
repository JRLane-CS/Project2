/* this index.js set up for heroku only */

//set node variables
const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();

//set heroku configuration variables for my psql database
var heroconfig = {
user: 'vadwksdgipvswi',
database: 'd9iendoj9imiad',
password: 'e0621e7d084c50d0a302890cbbd545b02ef040077f555cf181e580b23e38631b',
host: 'ec2-184-73-192-172.compute-1.amazonaws.com',
port: 5432,
max: 10,
idleTimeoutMillis: 30000,
};
const { Pool } = require('pg'); 
const pool = new Pool(heroconfig);  

//set query variables
var singleQuery = '';
var listQuery = '';
var dbstring = 
'SELECT '+ 
  'movie.id AS id, '+
  'movie.title AS title, '+
  'movie.made AS year, '+
  'rating.mpaa AS rating, '+
  'actor.name AS actor, '+
  'actress.name AS actress '+
'FROM '+
  'movie '+
'JOIN '+
  'rating '+
'ON '+
  'movie.rating_id = rating.id '+
'JOIN '+
  'actor '+
'ON '+
  'actor.id = movie.actor_id '+
'JOIN '+
  'actress '+
'ON '+
  'actress.id = movie.actress_id ';
var category = ['ORDER BY movie.title ASC', 'ORDER BY movie.made ASC', 
  'ORDER BY rating.mpaa ASC', 'ORDER BY actor.name ASC', 
  'ORDER BY actress.name ASC'];
var where = 'WHERE title = $2';

//set express variables
app.set('port', (PORT));
app.use(express.static(path.join(__dirname, "public")))
  
//set / path
app.get("/", (req, res) => res.render("pages/index"))

//set /getMovie path and get single query
app.get("/getMovie", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    singlequery = dbstring+where;
    client.query(singlequery, [req.query.title], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.json(result.rows);
      res.end();
    });
  })
})

//set /getMovies path and get movie list sorted by user selection  
app.get("/getMovies", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    var list = req.query.list;
    listQuery = dbstring+category[list];
    client.query(listQuery, function(err, result) {
      done();
      if (err) {
	    return console.error('error running query', err);
      }
      res.json(result.rows);
      res.end();
    });
  })
})
  
//set up local host port
app.listen(PORT, () => console.log(`Listening on ${PORT}`));