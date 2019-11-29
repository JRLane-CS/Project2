CREATE DATABASE movies;

CREATE TABLE rating (
  id serial PRIMARY KEY,
  mpaa VARCHAR(12) NOT NULL
);

CREATE TABLE actor (
  id serial PRIMARY KEY,
  name VARCHAR(256) NOT NULL
);

CREATE TABLE actress (
  id serial PRIMARY KEY,
  name VARCHAR(256) NOT NULL
);

CREATE TABLE movie (
  id serial PRIMARY KEY,
  title VARCHAR(256) NOT NULL,
  made INTEGER NOT NULL,
  rating_id INTEGER NOT NULL,
    CONSTRAINT rating_id FOREIGN KEY (rating_id)
    REFERENCES rating(id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
  actor_id INTEGER NOT NULL,
    CONSTRAINT actor_id FOREIGN KEY (actor_id)
    REFERENCES actor(id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION,
  actress_id INTEGER NOT NULL,
    CONSTRAINT actress_id FOREIGN KEY (actress_id)
    REFERENCES actress(id) MATCH SIMPLE
    ON UPDATE NO ACTION ON DELETE NO ACTION	
);


INSERT INTO rating(mpaa) VALUES ('G');

INSERT INTO rating(mpaa) VALUES ('PG');

INSERT INTO rating(mpaa) VALUES ('PG-13');

INSERT INTO rating(mpaa) VALUES ('R');

INSERT INTO rating(mpaa) VALUES ('TV-14');

INSERT INTO actor(name) VALUES ('Robert Downey, Jr.');

INSERT INTO actress(name) VALUES ('Gweneth Paltrow');

INSERT INTO actor(name) VALUES ('Pedro Pascal');

INSERT INTO actress(name) VALUES ('Adrianne Palicki');

INSERT INTO actor(name) VALUES ('Chris Pine');

INSERT INTO actress(name) VALUES ('Gal Gadot');

INSERT INTO actor(name) VALUES ('Henry Cavill');

INSERT INTO actress(name) VALUES ('Amy Adams');

INSERT INTO actor(name) VALUES ('Jim Caviezel');

INSERT INTO actress(name) VALUES ('Monica Bellucci');

INSERT INTO actor(name) VALUES ('Harry Stockwell');

INSERT INTO actress(name) VALUES ('Adriana Caselotti');

INSERT INTO actor(name) VALUES ('Harry Hamlin');

INSERT INTO actress(name) VALUES ('Claire Bloom');

INSERT INTO actor(name) VALUES ('Justin Theroux');

INSERT INTO actress(name) VALUES ('Tessa Thompson');

INSERT INTO actor(name) VALUES ('Ryan Reynolds');

INSERT INTO actress(name) VALUES ('Blake Lively');

INSERT INTO actor(name) VALUES ('Ryan Reynolds');

INSERT INTO actress(name) VALUES ('Mary-Louise Parker');

INSERT INTO actor(name) VALUES ('Anthony Hopkins');

INSERT INTO actress(name) VALUES ('Gweneth Paltrow');

INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES ('Iron Man', 2008, 3, 1, 1);

INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES ('Wonder Woman', 2011, 5, 2, 2);

INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES ('Wonder Woman', 2017, 3, 3, 3);

INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES ('Man of Steel', 2013, 3, 4, 4);

INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES ('The Passion of the Christ', 2004, 4, 5, 5);

INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES ('Snow White and the Seven Dwarves', 1937, 1, 6, 6);

INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES ('Clash of the Titans', 1981, 2, 7, 7);

INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES ('Lady and the Tramp', 2019, 2, 8, 8);

INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES ('Green Lantern', 2011, 3, 9, 9);

INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES ('R.I.P.D.', 2013, 3, 9, 10);

INSERT INTO movie(title, made, rating_id, actor_id, actress_id) VALUES ('Proof', 2005, 3, 11, 1);





/* List alphabetically by movie title */
SELECT 
    movie.id AS id,
	movie.title AS title,
    movie.made AS year,
	rating.mpaa AS rating,
    actor.name AS actor,
	actress.name AS actress
  FROM 
    movie
  JOIN 
    rating
  ON 
    movie.rating_id = rating.id
  JOIN 
    actor
  ON 
    actor.id = movie.actor_id
  JOIN 
    actress
  ON 
    actress.id = movie.actress_id
  ORDER BY 
    movie.title ASC;

/* List alphabetically by actor name */
SELECT 
    movie.id AS id,
	movie.title AS title,
    movie.made AS year,
	rating.mpaa AS rating,
    actor.name AS actor,
	actress.name AS actress
  FROM 
    movie
  JOIN 
    rating
  ON 
    movie.rating_id = rating.id
  JOIN 
    actor
  ON 
    actor.id = movie.actor_id
  JOIN 
    actress
  ON 
    actress.id = movie.actress_id
  ORDER BY
    actor.name ASC;

/* List alphabetically by actress name */
SELECT 
    movie.id AS id,
	movie.title AS title,
    movie.made AS year,
	rating.mpaa AS rating,
    actor.name AS actor,
	actress.name AS actress
  FROM 
    movie
  JOIN 
    rating
  ON 
    movie.rating_id = rating.id
  JOIN 
    actor
  ON 
    actor.id = movie.actor_id
  JOIN 
    actress
  ON 
    actress.id = movie.actress_id
  ORDER BY
    actress.name ASC;

/* List alphabetically by movie rating */
SELECT 
    movie.id AS id,
	movie.title AS title,
    movie.made AS year,
	rating.mpaa AS rating,
    actor.name AS actor,
	actress.name AS actress
  FROM 
    movie
  JOIN 
    rating
  ON 
    movie.rating_id = rating.id
  JOIN 
    actor
  ON 
    actor.id = movie.actor_id
  JOIN 
    actress
  ON 
    actress.id = movie.actress_id
  ORDER BY
    rating.mpaa ASC;

/* List alphabetically by year made */
SELECT 
    movie.id AS id,
	movie.title AS title,
    movie.made AS year,
	rating.mpaa AS rating,
    actor.name AS actor,
	actress.name AS actress
  FROM 
    movie
  JOIN 
    rating
  ON 
    movie.rating_id = rating.id
  JOIN 
    actor
  ON 
    actor.id = movie.actor_id
  JOIN 
    actress
  ON 
    actress.id = movie.actress_id
  ORDER BY
    movie.made ASC;
