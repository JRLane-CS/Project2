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

  res.header("Access-Control-Allow-Origin", "herokuapp.com");
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
	console.log("getMovie: "+title);
  
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

//set /addMovie path and add movie to db
app.get("/addMovie", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    var title = req.query.title;
    var made = req.query.year;
    var rating = req.query.rating;
    var actor = req.query.actor;
    var actress = req.query.actress;
    var actress_id;
    var rating_id;
    var actor_id;
	  
    //rating query
    var ratingquery = 'SELECT * FROM rating WHERE mpaa = '+rating;
    client.query(ratingquery, function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
    });
    
    //if not there, insert and get new rating id
    if (result == null){
      ratingquery = 'INSERT INTO rating(mpaa) VALUES ('+rating+') RETURNING id';
      client.query(ratingquery, function(err, result) {
        done();
        if (err) {
          return console.error('error running query', err);
        }
      });
      rating_id = result;
    }
    
    //else get rating id
    else
    {
      rating_id = rating.id;
    }
    
    //actor query
    var actorquery = 'SELECT * FROM actor WHERE name = '+actor;
    client.query(actorquery, function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
    });
    
    //if not there, insert and get new id
    if (result == null){
      actorquery = 'INSERT INTO actor(name) VALUES ('+actor+') RETURNING id';
      client.query(actorquery, function(err, result) {
        done();
        if (err) {
          return console.error('error running query', err);
        }
      });
      actor_id = result;
    }
    
    //otherwise, get actor id
    else
    {
      actor_id = actor.id;
    }
    
    //actress query
    var actressquery = 'SELECT * FROM actress WHERE name = '+actress;
    client.query(actressquery, function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
    });
    
    //if not there, insert and get new id
    if (result == null){
      actressquery = 'INSERT INTO actress(name) VALUES ('+actress+') RETURNING id';
      client.query(actressquery, function(err, result) {
        done();
        if (err) {
          return console.error('error running query', err);
        }
      });
      actress_id = result;
    }
    
    //if there, get actress id
    else
    {
      actress_id = actoress.id;
    }
    
    //add movie to db
    singlequery = 'INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES ('+
      title+', '+made+', '+rating_id+', '+actor_id+', '+actress_id+')';
    client.query(singlequery, function(err, result) {
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
    var id = req.query.id;
    var title = req.query.title;
    var made = req.query.year;
    var rating = req.query.rating;
    var actor = req.query.actor;
    var actress = req.query.actress;
    var actress_id;
    var rating_id;
    var actor_id;
	  
    //rating query
    var ratingquery = 'SELECT * FROM rating WHERE mpaa = '+rating;
    client.query(ratingquery, function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
    });
    
    //if not there, insert and get new rating id
    if (result == null){
      ratingquery = 'INSERT INTO rating(mpaa) VALUES ('+rating+') RETURNING id';
      client.query(ratingquery, function(err, result) {
        done();
        if (err) {
          return console.error('error running query', err);
        }
      });
      rating_id = result;
    }
    
    //else get rating id
    else
    {
      rating_id = rating.id;
    }
    
    //actor query
    var actorquery = 'SELECT * FROM actor WHERE name = '+actor;
    client.query(actorquery, function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
    });
    
    //if not there, insert and get new id
    if (result == null){
      actorquery = 'INSERT INTO actor(name) VALUES ('+actor+') RETURNING id';
      client.query(actorquery, function(err, result) {
        done();
        if (err) {
          return console.error('error running query', err);
        }
      });
      actor_id = result;
    }
    
    //otherwise, get actor id
    else
    {
      actor_id = actor.id;
    }
    
    //actress query
    var actressquery = 'SELECT * FROM actress WHERE name = '+actress;
    client.query(actressquery, function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
    });
    
    //if not there, insert and get new id
    if (result == null){
      actressquery = 'INSERT INTO actress(name) VALUES ('+actress+') RETURNING id';
      client.query(actressquery, function(err, result) {
        done();
        if (err) {
          return console.error('error running query', err);
        }
      });
      actress_id = result;
    }
    
    //if there, get actress id
    else
    {
      actress_id = actoress.id;
    }
    
    //update movie in db
    singlequery = 'UPDATE movies SET movie.title = '+title+
      ', movie.made = '+made+
      ', movie.rating = '+rating_id+
      ', movie.actor = '+actor_id+
      ', movie.actress = '+actress_id+
      ' WHERE movie.id = '+id;
    client.query(singlequery, function(err, result) {
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