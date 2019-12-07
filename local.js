/* this index.js set up for local access only */

//set node variables
const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
var cleaner = require('sanitizer');

//set heroku configuration variables for my psql database
var herokuconfig = {
user: 'vadwksdgipvswi',
database: 'd9iendoj9imiad',
password: 'e0621e7d084c50d0a302890cbbd545b02ef040077f555cf181e580b23e38631b',
host: 'ec2-184-73-192-172.compute-1.amazonaws.com',
port: 5432,
max: 10,
idleTimeoutMillis: 30000,
};
const config = {
  user: 'jerry',
  database: 'movies',         
  port: 5432                  
};

//prepare for post
  
  
const { Pool } = require('pg'); 
const pool = new Pool(config);  

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

app.use(function (req, res, next) {

  console.log(req.headers);
  res.header("Access-Control-Allow-Origin", "herokuapp.com"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//set express variables
app.set('port', (PORT));
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
  
//set / path
app.get("/", (req, res) => res.render("pages/index"))

//set /getMovie path and get single query
app.get("/getMovie", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
	var title = cleaner.sanitize(req.query.title);
	singlequery = dbstring+'WHERE title = $1 ';
    client.query(singlequery, [title], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.json(result.rows);
      res.end();
    });
  })
})

//set /getActor path and get single query
app.get("/getActor", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
	var actor = cleaner.sanitize(req.query.actor);
	singlequery = dbstring+'WHERE actor.name = $1 ';
	client.query(singlequery, [actor], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.json(result.rows);
      res.end();
    });
  })
})

//set /getActor path and get single query
app.get("/getActress", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    var actress = cleaner.sanitize(req.query.actress);
	singlequery = dbstring+'WHERE actress.name = $1 ';
    client.query(singlequery, [actress], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
	  res.json(result.rows);
      res.end();
    });
  })
})

//set /getRating path and post single query
app.post("/getRating", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
	singlequery = dbstring+'WHERE rating.mpaa = $1 ';
    client.query(singlequery, [req.body.rating], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.json(result.rows);
      res.end();
    });
  })
})

/*/set /addMovie path and post single query
app.post("/addMovie", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
	singlequery = dbstring+'WHERE rating.mpaa = $1 ';
    client.query(singlequery, [req.body.rating], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.json(result.rows);
      res.end();
    });
  })
})

//set /deleteMovie path and post single query
app.post("/deleteMovie", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
	singlequery = dbstring+'WHERE rating.mpaa = $1 ';
    client.query(singlequery, [req.body.rating], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.json(result.rows);
      res.end();
    });
  })
})

//set /updateMovie path and post single query
app.post("/updateMovie", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
	singlequery = dbstring+'WHERE rating.mpaa = $1 ';
    client.query(singlequery, [req.body.rating], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      res.json(result.rows);
      res.end();
    });
  })
})
*/

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