const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
var pg = require('pg');
const config = {
    user: 'jerry',
    database: 'movies',         //change to mydb for Heroku deployment
    port: 5432                  //default
};

//set variables
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
var where = 'WHERE title = $1 ';

//create pool object using config as the parameter
const pool = new pg.Pool(config);

express()
  .use(express.static(path.join(__dirname, "public")))
  
  //set / path
  .get("/", (req, res) => res.render("pages/index"))

  //set /getMovie path and get single query
  .get("/getMovie", (req, res) => {
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
  .get("/getMovies", (req, res) => {
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
  .listen(PORT, () => console.log(`Listening on ${PORT}`));