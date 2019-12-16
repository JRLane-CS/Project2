//set url for server
var url = window.location.hostname.startsWith("localhost")
  ? "http://localhost:5000"
  : "https://fun-times-project2.herokuapp.com";

//set global variables for easy function transference    
var title;
var movieId;
var ratingId;
var actorId;
var actressId;

//base db functions through server
$(function() {
   
  //single query title based
  $("#searchMovie").click(function(event) {
    event.preventDefault();
    $("ul").empty();
    $("#output").empty();
	  $.get(
      `${url}/getMovie`,
      {
        title: $("#title").val()
      },
      function(json) { 
        if (json[0] == null)
		  $("ul").append($("<li>").text(
            `No database match`
        ));
	    else
	      json.forEach(function(row) {         
          $("ul").append($("<li>").text(
            `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
          ));  
        });
      }
    );
  });
  
  //single query actor based
  $("#searchActor").click(function(event) {
    event.preventDefault();
    $("ul").empty();
    $("#output").empty();
	  $.get(
      `${url}/getActor`,
      {
        actor: $("#actor").val()
      },
      function(json) { 
        if (json[0] == null)
		  $("ul").append($("<li>").text(
            `No database match`
        ));
	    else
	      json.forEach(function(row) {        
          $("ul").append($("<li>").text(
            `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
          ));  
        });
      }
    );
  });
  
  //single query actress based
  $("#searchActress").click(function(event) {
    event.preventDefault();
    $("ul").empty();
    $("#output").empty();
	  $.get(
      `${url}/getActress`,
      {
        actress: $("#actress").val()
      },
      function(json) { 
        if (json[0] == null)
		  $("ul").append($("<li>").text(
            `No database match`
        ));
	    else
	      json.forEach(function(row) {
          $("ul").append($("<li>").text(
            `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
          ));
        })
      }
    )}
  );
  
  //single query rating based
  $("#searchRating").click(function(event) {
    event.preventDefault();
    $("ul").empty();
    $("#output").empty();
	  $.post(
      `${url}/getRating`,
      {
        rating: $("#rating").val()
      },
      function(json) { 
        if (json[0] == null)
		  $("ul").append($("<li>").text(
            `No database match`
        ));
	    else
	      json.forEach(function(row) {
          $("ul").append($("<li>").text(
            `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
          ));  
        });
      }
    );
  });
  
  //delete movie query
  $("#deleteDbMovieQuery").click(function(event) {
    event.preventDefault();
    $("ul").empty();
    $("#output").empty();
	  $.get(
      `${url}/getMovie`,
      {
        title: $("#delete").val()
      },
      function(json) { 
        if (json[0] == null) {
		      $("ul").append($("<li>").text(
            `No database match`
          ));
        }
        else {
		      $("ul").append($("<li class='center'>").text(
            `- Click on movie to delete. -`
          ));   
        }        
	      json.forEach(function(r) {
          $("<li>", {"style" : "cursor: pointer;", 
            "value" : r.id, 
            "id":"movieId"}).attr( "r-title", r.title ).text(
            `${r.title},  ${r.year},  ${r.rating},  ${r.actor},  ${r.actress}`
          ).click(function (){ beSure(r.title, r.id, r.ratingid, r.actorid, r.actressid); }).appendTo( "ul" ); 
        });
      }
    );
  });
  
  //delete movie from database
  $("#deleteTrue").click(function(event) {
    event.preventDefault();
    $("ul").empty();
    $("#output").empty();    
    $.post(
      `${url}/deleteMovie`,
      {
        movieId:   movieId,
        ratingId:  ratingId,
        actorId:   actorId,
        actressId: actressId
      });
    
    //let user know the deletion is finished
    $("#output").html(
      '<br/>'+
      '<h1><b>'+title+' has been deleted!</b></h1>'
    );
    
    //wait a couple seconds for user to see message then go to root
    setTimeout(function() {
      $(location).attr('href',url);
    }, 2000);    
  });
  
  //add movie to database query
  $("#addMovieDb").click(function(event) {
    event.preventDefault();
    $("ul").empty();
	  $.post(
      `${url}/addMovie`,
      {
        title: $("#titleIn").val(),
		    year: $("#yearIn").val(),
		    rating: $("#ratingIn").val(),
		    actor: $("#actorIn").val(),
		    actress: $("#actressIn").val()
      }
    );
  });
  
  //add movie to database query
  $("#addMovieDbNew").click(function(event) {
    event.preventDefault();
    $("ul").empty();
	  
    //insert rating into db if not there
    $.post(
      `${url}/insertRating`,
      {
		    rating: $("#ratingIn").val()
      },
      function (json){ 
      }
    );
    
    //insert actor into db if not there
    $.post(
      `${url}/insertActor`,
      {
		    actor: $("#actorIn").val()
      },
      function (json){  
      }
    );
    
    //insert actress into db if not there
    $.post(
      `${url}/insertActress`,
      {
		    actress: $("#actressIn").val()
      },
      function (json){  
      }
    );
   

    //get ids for rating, actor, and actress    
    $.post(
      `${url}/checkRating`,
      {
		    rating: $("#ratingIn").val()
      },
      function (json){
        ratingId = json[0].id;  
      }
    );
    $.post(
      `${url}/checkActor`,
      {
		    actor: $("#actorIn").val()
      },
      function (json){
        actorId = json[0].id;  
      }
    );
    $.post(
      `${url}/checkActress`,
      {
		    actress: $("#actressIn").val()
      },
      function (json){
        actressId = json[0].id;
      }
    );
    
    
    //insert movie into database
    $.post(
      `${url}/insertMovie`,
      {
		    title: $("#titleIn").val(),
		    year: $("#yearIn").val(),
        ratingId: ratingId,
        actorId: actorId,
        actressId: actressId
      },
      function (json){   
      }
    );
  
  
  });
  
  //update database movie query
  $("#updateMovieDb").click(function(event) {
    event.preventDefault();
    $("ul").empty();
	  $.post(
      `${url}/updateMovie`,
      {
        title:   $("#titleIn").val(),
        year:    $("#yearIn"),
        rating:  $("#ratingIn"),
        actor:   $("#actorIn"),
        actress: $("#actressIn")
      },
      next()
    );
  });
  
  //list all movies with list sort parameter
  $("#all").click(function(event) {
    event.preventDefault();
    $("ul").empty();
    $("#output").empty();
	  $.get(
      `${url}/getMovies`,
      {
        list: $("#list").val()
      },
      function(json) {
        json.forEach(function(row) {
          $("ul").append($("<li>").text(
            `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
          ));  
        });
      }
    );
  });
});

/* Following functions are strictly for document manipulation */

//insure deletion is correct
function beSure(movie, id, rating, actor, actress){
  $("#output").empty();
  $("#output").html(
    '<br/>'+
    '<p><b>Are you sure?</b></p>'+
    '<button class = "center" type="button" id="deleteTrue" value='+id+
    '> Yes </button>'+
    '<button class = "center" type="button" id="deleteFalse"> No '+
    '</button>'+
    '<script src="main.js" ></script>'
  );
  title = movie;
  movieId = id;
  ratingId = rating;
  actorId = actor;
  actressId = actress;
}

//button handler for user deletion uncertainty, just go to root screen
$("#deleteFalse").click(function(event) {
  event.preventDefault();
  $(location).attr('href',url);
});  

//entry page for movie search
$("#getMovie").click(function(event) {
  event.preventDefault();
  $("#header").text("Search by Movie Title");
  $("#functions").empty();
  $("#output").empty();
  $("#functions").html(
	  '<form name="form-1">'+
    '<div>'+
    '<label for="title">Enter a movie title to search</label>'+
    '<input type="text" name="title" id="title"/>'+
    '</div>'+
    '<div>'+
    '<button type="button" id="searchMovie" >Search</button>'+
    '</div>'+
    '</form>'+
	  '<script src="main.js" ></script>'
  );
});

//entry page for actor search  
$("#getActor").click(function(event) {
  event.preventDefault();
  $("#header").text("Search by Actor"); 
  $("#functions").empty();
  $("#output").empty();
  $("#functions").html(
	  '<form name="form-1">'+
	  '<div>'+
    '<label for="actor">Enter an actor name to search</label>'+
    '<input type="text" name="actor" id="actor"/>'+
    '</div>'+
    '<div>'+
    '<button type="button" id="searchActor" >Search</button>'+
    '</div>'+
    '</form>'+
	  '<script src="main.js" ></script>'
  );  
})

//entry page for actress search
$("#getActress").click(function(event) {
  event.preventDefault();
  $("#header").text("Search by Actress"); 
  $("#functions").empty();
  $("#output").empty();
  $("#functions").html(
	  '<form name="form-1">'+
	  '<div>'+
    '<label for="actress">Enter an actress name to search</label>'+
    '<input type="text" name="actress" id="actress"/>'+
    '</div>'+
    '<div>'+
    '<button type="button" id="searchActress" >Search</button>'+
    '</div>'+
    '</form>'+
	  '<script src="main.js" ></script>'
  );  
})

//entry page for rating search
$("#getRating").click(function(event) {
  event.preventDefault();
  $("#header").text("Search by Rating"); 
  $("#functions").empty();
  $("#output").empty();
  $("#functions").html(
	  '<form method="post" name="form-1">'+
	  '<div>'+
    '<label for="rating">Select a rating to search</label>'+
    '<select id="rating" name="rating" >'+
    '<option value="G">G</option>'+
    '<option value="PG">PG</option>'+
    '<option value="PG-13">PG-13</option>'+
    '<option value="TV-14">TV-14</option>'+
    '<option value="NC-17">NC-17</option>'+
    '<option value="R">R</option>'+
    '</select>'+
    '</div>'+
    '<div>'+
    '<button type="button" id="searchRating" >Search</button>'+
    '</div>'+
    '</form>'+
	  '<script src="main.js" ></script>'
  );    
})

//entry page for movie deletion
$("#deleteMovie").click(function(event) {
  $("#header").text("Delete Movie"); 
  $("#functions").empty();
  $("#output").empty();
  $("#functions").html(
	  '<form name="form-1">'+
	  '<div>'+
    '<label for="delete">Enter movie to delete</label>'+
    '<input type="text" name="delete" id="delete"/>'+
    '</div>'+
    '<div>'+
    '<button type="button" id="deleteDbMovieQuery" >Delete</button>'+
    '</div>'+
    '</form>'+
	  '<script src="main.js" ></script>'
  );
})

//entry page to add movie
$("#addMovie").click(function(event) { 
  $("#functions").empty();
  $("#output").empty();
  addMovie();
  $("#functions").append(
    '<div>'+
    '<button type="button" id="addMovieDb" >Enter</button>'+
    '</div>'+
    '</form>'+
	  '<script src="main.js" ></script>'
	);  
})

//entry page for movie update
$("#updateMovie").click(function(event) {
  $("#header").text("Update Movie"); 
  $("#functions").empty();
  $("#output").empty();
  $("#functions").html(
	  '<form name="form-1">'+
	  '<div>'+
    '<label for="update">Enter movie to update</label>'+
    '<input type="text" name="update" id="update"/>'+
    '</div>'+
    '<div>'+
    '<button type="button" id="updateMovieDb" >Update</button>'+
    '</div>'+
    '</form>'+
	  '<script src="main.js" ></script>'
  );
  //check code for working delete to help with clues for the following:
  //after movie is selected
  //addMovie();
  //$("#functions").append(
  //  '<div>'+
  //  '<button type="button" id="updateMovies" >Enter</button>'+
  //  '</div>'+
  //  '</form>'+
  //'<script src="main.js" ></script>'
  //);
  //populate inputs with movie data values  
})

//entry page to show movie list sorted by user selection
$("#listMovies").click(function(event) {
  event.preventDefault();
  $("#header").text("List Movies"); 
  $("#functions").empty(); 
  $("#output").empty();
  $("#functions").html(
    '<form name="form-1">'+
    '<label for="list">Show all movies sorted by:</label>'+
    '<select id="list" name="list" >'+
    '<option value="0">Title</option>'+
	  '<option value="1">Year Made</option>'+
    '<option value="2">Rating</option>'+
    '<option value="3">Actor</option>'+
    '<option value="4">Actress</option>'+
    '</select>'+
    '</div>'+
    '<div>'+
    '<button type="button" id="all">Show</button>'+
    '</div>'+
    '</form>'+
    '<script src="main.js" ></script>'	
  );
})

//detailed input page for adding or updating a movie to the database
function addMovie() {
  $("#functions").html(
	  '<form name="form-1">'+
	  '<div>'+
    '<label for="title">Enter movie title</label>'+
    '<input type="text" name="title" id="titleIn"/>'+
    '</div>'+
	  '<div>'+
    '<label for="year">Enter year made</label>'+
    '<input type="number" name="year" id="yearIn"/>'+
    '</div>'+
	  '<div>'+
    '<label for="rating">Enter movie rating</label>'+
    '<input type="text" name="rating" id="ratingIn"/>'+
    '</div>'+
	  '<div>'+
    '<label for="actor">Enter lead actor</label>'+
    '<input type="text" name="actor" id="actorIn"/>'+
    '</div>'+
	  '<div>'+
    '<label for="actress">Enter lead actress</label>'+
    '<input type="text" name="actress" id="actressIn"/>'+
    '</div>'
  );	
}