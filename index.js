/* this index.js set up for heroku access only */

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
  
//prepare for database connection
const { Pool } = require('pg'); 
const pool = new Pool(herokuconfig);  

//set query variables
var singleQuery = '';
var listQuery = '';
var dbstring = 
'SELECT '+ 
  'movie.id AS id, '+
  'movie.title AS title, '+
  'movie.made AS year, '+
  'rating.id AS ratingId, '+
  'rating.mpaa AS rating, '+
  'actor.id AS actorId, ' +
  'actor.name AS actor, '+
  'actress.id AS actressId, '+
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
  
//create global variables for holding data
var id;
var title;
var made;
var rating = "";
var actor = "";
var actress = "";
var queryResult;  
var results;
var ratingId = 0;
var actorId = 0;
var actressId = 0;

//accept all cor requests
app.use(cors());

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
	  if (req.query.title.indexOf("'") === -1)
      var title = special(req.query.title);
    else 
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

//sanitizes queryIn and allows for apostrophe insertion into db
function special(queryIn) {
  
  //sanitize inputs
  var cleaned = cleaner.sanitize(queryIn);
  
  //if an apostrophe is found, replace it with two, put into cleaned variable
  var replacement = cleaned;
  while (replacement.indexOf("'") !== -1 && replacement.indexOf("''") === -1) {
    replacement = cleaned.replace(/'/g, "''");
    cleaned = replacement;
  }
  
  //return cleaned variable, and if it had apostrophe, now it has two
  return cleaned;
}

//set /getActor path and get single query
app.get("/getActor", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
	var actor = special(req.query.actor);
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

//set /getActress path and get single query
app.get("/getActress", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    var actress = special(req.query.actress); 
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
    rating = special(req.body.rating); 
	  singlequery = dbstring+'WHERE rating.mpaa = $1 ';
    client.query(singlequery, [rating], function(err, result) {
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
    var id =special(req.body.id);
    var title = special(req.body.title); 
    var made = special(req.body.year);
    var rating = special(req.body.rating);
    var actor = special(req.body.actor);
    var actress = special(req.body.actress);
    var actress_id = special(req.body.actressId);
    var rating_id = special(req.body.ratingId);
    var actor_id = special(req.body.actorId);
    
    //check for rating 
    ratingQuery = "SELECT * FROM rating WHERE mpaa = '"+rating+"'";
    client.query(ratingQuery, function(err, result) {
      if (err) {
       return console.error('error running rating table query', err);
      }
       
      //if not there add rating to table
      if (result.rows[0] === undefined) { 
        ratingAddQuery = "INSERT INTO rating(mpaa) VALUES ('"+rating+"') RETURNING id";
        client.query(ratingAddQuery, function(err, result) {
          if (err) {
	          return console.error('error running rating insert query', err);
          } 
          
          //assign rating.id to variable
          ratingId = result.rows[0].id;          
        });        
      }
      else {
        
        //assign rating.id to variable
        ratingId = result.rows[0].id;
      }        
    
      
        //check for actor
        actorQuery = "SELECT * FROM actor WHERE name = '"+actor+"'";
        client.query(actorQuery, function(err, result) {
          if (err) {
            return console.error('error running actor table query', err);
          }
       
          //if not there add actor to table
          if (result.rows[0] === undefined) { 
            actorAddQuery = "INSERT INTO actor(name) VALUES ('"+actor+"') RETURNING id";
            client.query(actorAddQuery, function(err, result) {
              if (err) {
	              return console.error('error running actor insert query', err);
              }
          
              //assign actor.id to variable          
              actorId = result.rows[0].id;          
            }); 
          }
          else {
        
            //assign actor.id to variable
            actorId = result.rows[0].id;
          }
    
            //check for actress
            actressQuery = "SELECT * FROM actress WHERE name = '"+actress+"'";
            client.query(actressQuery, function(err, result) {
              if (err) {
                return console.error('error running actress table query', err);
              }
       
              //if not there add actress to table
              if (result.rows[0] === undefined) { 
                actressAddQuery = "INSERT INTO actress(name) VALUES ('"+actress+"') RETURNING id";
                client.query(actressAddQuery, function(err, result) {
                  if (err) {
	                  return console.error('error running actress insert query', err);
                  }
          
                  //assign actressId id from table
                  actressId = result.rows[0].id;
          
                  //update movie in the database
                  updateMovieQuery = "UPDATE movie SET title = '"+title+
                    "', made = '"+made+"', rating_id = '"+ratingId+
                    "', actor_id = '"+actorId+"', actress_id = '"+actressId+
                    "' WHERE id = '"+id+"'";
                  client.query(updateMovieQuery, function(err, result) {
                    if (err) {
	                    return console.error('error running movie insert query', err);
                    }  
                  });          
                }); 
              }
              else {
      
                //assign actress.id to variable
                actressId = result.rows[0].id;
        
                //update movie in the database
                updateMovieQuery = "UPDATE movie SET title = '"+title+
                  "', made = '"+made+"', rating_id = '"+ratingId+
                  "', actor_id = '"+actorId+"', actress_id = '"+actressId+
                  "' WHERE id = '"+id+"'";
                client.query(updateMovieQuery, function(err, result) {
                  if (err) {
	                  return console.error('error running movie insert query', err);
                  }  
                });          
              }
            });    
        });
    });

    //close pool connection
    done();
    
    //end response
    res.end();  
  })
})
  
//set /deleteMovies path and delete user selected movie  
app.post("/deleteMovie", (req, res) => {
  
  //connect to database
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    
    //get variables for deletion operations
    var id = special(req.body.movieId);
    var rating = special(req.body.ratingId);
    var actor = special(req.body.actorId);
    var actress = special(req.body.actressId);
    
    //delete movie from movie table
    deleteQuery = "DELETE FROM movie WHERE id = "+id;
    client.query(deleteQuery, function(err, result) {
      if (err) {
	      return console.error('error running movie delete query', err);
      }  
    });

    //check for rating and if no longer used in database, delete rating
    ratingQuery = "SELECT * FROM movie WHERE rating_id = "+rating;
    client.query(ratingQuery, function(err, result) {
      if (err) {
       return console.error('error running rating table query', err);
      }
       
      //if not used anywhere else, delete rating from table
      if (result.rows[0] === undefined) { 
        deleteQuery = "DELETE FROM rating WHERE id = "+rating;
        client.query(deleteQuery, function(err, result) {
          if (err) {
	          return console.error('error running rating delete query', err);
          }        
        }); 
      }
    });
      
    //check for actor and if no longer used in database, delete actor
    ratingQuery = "SELECT * FROM movie WHERE actor_id = "+actor;
    client.query(ratingQuery, function(err, result) {
      if (err) {
       return console.error('error running actor table query', err);
      }
       
      //if not used anywhere else, delete actor from table
      if (result.rows[0] === undefined) { 
        deleteQuery = "DELETE FROM actor WHERE id = "+actor;
        client.query(deleteQuery, function(err, result) {
          if (err) {
	          return console.error('error running actor delete query', err);
          }        
        }); 
      }
    });
      
    //check for actress and if no longer used in database, delete actress
    ratingQuery = "SELECT * FROM movie WHERE actress_id = "+actress;
    client.query(ratingQuery, function(err, result) {
      if (err) {
       return console.error('error running actress table query', err);
      }
       
      //if not used anywhere else, delete actress from table
      if (result.rows[0] === undefined) { 
        deleteQuery = "DELETE FROM actress WHERE id = "+actress;
        client.query(deleteQuery, function(err, result) {
          if (err) {
	          return console.error('error running actress delete query', err);
          }        
        }); 
      }
    });
      
    //close pool connection
    done();
    
    //end response
    res.end();  
  })
})

//set /addMovies path and add user input movie  
app.post("/addMovie", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    //get variables for deletion operations
    title = special(req.body.title);
    made = special(req.body.year);
    rating = special(req.body.rating);
    actor = special(req.body.actor);
    actress = special(req.body.actress);
    
    //check for rating 
    ratingQuery = "SELECT * FROM rating WHERE mpaa = '"+rating+"'";
    client.query(ratingQuery, function(err, result) {
      if (err) {
       return console.error('error running rating table query', err);
      }
       
      //if not there add rating to table
      if (result.rows[0] === undefined) { 
        ratingAddQuery = "INSERT INTO rating(mpaa) VALUES ('"+rating+"') RETURNING id";
        client.query(ratingAddQuery, function(err, result) {
          if (err) {
	          return console.error('error running rating insert query', err);
          } 
          
          //assign rating.id to variable
          ratingId = result.rows[0].id;          
        });        
      }
      else {
        
        //assign rating.id to variable
        ratingId = result.rows[0].id;
      }        
    
      
        //check for actor
        actorQuery = "SELECT * FROM actor WHERE name = '"+actor+"'";
        client.query(actorQuery, function(err, result) {
          if (err) {
            return console.error('error running actor table query', err);
          }
       
          //if not there add actor to table
          if (result.rows[0] === undefined) { 
            actorAddQuery = "INSERT INTO actor(name) VALUES ('"+actor+"') RETURNING id";
            client.query(actorAddQuery, function(err, result) {
              if (err) {
	              return console.error('error running actor insert query', err);
              }
          
              //assign actor.id to variable          
              actorId = result.rows[0].id;          
            }); 
          }
          else {
        
            //assign actor.id to variable
            actorId = result.rows[0].id;
          }
    
            //check for actress
            actressQuery = "SELECT * FROM actress WHERE name = '"+actress+"'";
            client.query(actressQuery, function(err, result) {
              if (err) {
                return console.error('error running actress table query', err);
              }
       
              //if not there add actress to table
              if (result.rows[0] === undefined) { 
                actressAddQuery = "INSERT INTO actress(name) VALUES ('"+actress+"') RETURNING id";
                client.query(actressAddQuery, function(err, result) {
                  if (err) {
	                  return console.error('error running actress insert query', err);
                  }
          
                  //assign actressId id from table
                  actressId = result.rows[0].id;
          
                  //add movie to the database
                  addMovieQuery = "INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES"+ 
                    "('"+title+"', '"+made+"', '"+ratingId+"', '"+actorId+"', '"+actressId+"')";
                  client.query(addMovieQuery, function(err, result) {
                    if (err) {
	                    return console.error('error running movie insert query', err);
                    }  
                  });          
                }); 
              }
              else {
      
                //assign actress.id to variable
                actressId = result.rows[0].id;
        
                //add movie to the database
                addMovieQuery = "INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES"+ 
                  "('"+title+"', '"+made+"', '"+ratingId+"', '"+actorId+"', '"+actressId+"')";
                client.query(addMovieQuery, function(err, result) {
                  if (err) {
	                  return console.error('error running movie insert query', err);
                  }  
                });          
              }
            });    
        });
    });

    //close pool connection
    done();
    
    //end response
    res.end();  
  })
})

//set /getMovies path and get movie list sorted by user selection  
app.get("/getMovies", (req, res) => {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    var title = cleaner.sanitize(req.query.title);
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