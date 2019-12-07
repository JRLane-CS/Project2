

$(function() {
  
  //set url for server
  var url = window.location.hostname.startsWith("localhost")
    ? "http://localhost:5000"
    : "https://fun-times-project2.herokuapp.com";
  
  //single query title based
  $("#searchMovie").click(function(event) {
    event.preventDefault();
    $("ul").empty();
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
          $.get(
            `${url}/getMovie`,
            {
            },
            function(json) {
              $("ul").append($("<li>").text(
                `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
              ));
            }
          );
        });
      }
    );
  });
  
  //single query actor based
  $("#searchActor").click(function(event) {
    event.preventDefault();
    $("ul").empty();
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
          $.get(
            `${url}/getActor`,
            {
            },
            function(json) {
              $("ul").append($("<li>").text(
                `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
              ));
            }
          );
        });
      }
    );
  });
  
  //single query actor based
  $("#searchActress").click(function(event) {
    event.preventDefault();
    $("ul").empty();
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
          $.get(
            `${url}/getActress`,
            {
            },
            function(json) {
              $("ul").append($("<li>").text(
                `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
              ));
            }
          );
        });
      }
    );
  });
  
  //single query rating based
  $("#searchRating").click(function(event) {
    event.preventDefault();
    $("ul").empty();
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
          $.post(
            `${url}/getRating`,
            {
            },
            function(json) {
              $("ul").append($("<li>").text(
                `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
              ));
            }
          );
        });
      }
    );
  });
  
  /*/delete movie query
  $("#deleteDbMovie").click(function(event) {
    event.preventDefault();
    $("ul").empty();
	$.post(
      `${url}/getMovie`,
      {
        title: $("#title").val()
      },
      function(json) { 
        if (json[0] == null)
		  $("ul").append($("<li>").text(
            `No database match`
        ));
	    else if (json[1] != null)
		  $("ul").append($("<li>").text(
            `Which movie do you want to delete?`	
	      json.forEach(function(row) {
          $.post(
            `${url}/getMovie`,
            {
            },
            function(json) {
              $("ul").append($("<li>").text(
                `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
              ));
            }
          );
        });
      }
    );
  });
  
  //add movie to database query
  $("#addMovieDb").click(function(event) {
    event.preventDefault();
    $("ul").empty();
	$.post(
      `${url}/getMovie`,
      {
        title: $("#title").val(),
		    year: $("#year").val(),
		    rating: $("#rating").val(),
		    actor: $("#actor").val(),
		    actress: $("#actress").val()
      },
      function(json) { 
        if (json[0] == null)
		  $("ul").append($("<li>").text(
            `No database match`
        ));
	    else
	      json.forEach(function(row) {
          $.post(
            `${url}/getMovie`,
            {
            },
            function(json) {
              $("ul").append($("<li>").text(
                `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
              ));
            }
          );
        });
      }
    );
  });
  
  //update database movie query
  $("#updateMovieDb").click(function(event) {
    event.preventDefault();
    $("ul").empty();
	$.post(
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
          $.post(
            `${url}/getMovie`,
            {
            },
            function(json) {
              $("ul").append($("<li>").text(
                `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
              ));
            }
          );
        });
      }
    );
  });
  */
  
  //list all movies with list sort parameter
  $("#all").click(function(event) {
    event.preventDefault();
    $("ul").empty();
	$.get(
      `${url}/getMovies`,
      {
        list: $("#list").val()
      },
      function(json) {
        json.forEach(function(row) {
          $.get(
            `${url}/getMovie`,
            {
            },
            function(json) {
              $("ul").append($("<li>").text(
                `${row.title},  ${row.year},  ${row.rating},  ${row.actor},  ${row.actress}`
              ));
            }
          );
        });
      }
    );
  });
});


$("#getMovie").click(function(event) {
    event.preventDefault();
    $("#header").text("Search by Movie Title");
    $("#functions").empty();
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
  
$("#getActor").click(function(event) {
  event.preventDefault();
  $("#header").text("Search by Actor"); 
  $("#functions").empty();
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

$("#getActress").click(function(event) {
  event.preventDefault();
  $("#header").text("Search by Actress"); 
  $("#functions").empty();
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

$("#getRating").click(function(event) {
  event.preventDefault();
  $("#header").text("Search by Rating"); 
  $("#functions").empty();
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

$("#deleteMovie").click(function(event) {
  $("#header").text("Delete Movie"); 
  $("#functions").empty();
  $("#functions").html(
	'<form name="form-1">'+
	'<div>'+
    '<label for="delete">Enter movie to delete</label>'+
    '<input type="text" name="delete" id="delete"/>'+
    '</div>'+
    '<div>'+
    '<button type="button" id="deleteDbMovie" >Delete</button>'+
    '</div>'+
    '</form>'+
	'<script src="main.js" ></script>'
  );
  //if more than one, make selectable
  //then add verification "are you sure?" and two buttons yes and no 
})

$("#addMovie").click(function(event) {
  $("#header").text("Add Movie"); 
  $("#functions").empty();
  addMovie();
  $("#functions").append(
    '<div>'+
    '<button type="button" id="addMovieDb" >Enter</button>'+
    '</div>'+
    '</form>'+
	'<script src="main.js" ></script>'
	);  
})

$("#updateMovie").click(function(event) {
  $("#header").text("Update Movie"); 
  $("#functions").empty();
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

$("#listMovies").click(function(event) {
  event.preventDefault();
  $("#header").text("List Movies"); 
  $("#functions").empty(); 
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

function addMovie() {
  $("#functions").html(
	'<form name="form-1">'+
	'<div>'+
    '<label for="title">Enter movie title</label>'+
    '<input type="text" name="title" id="title"/>'+
    '</div>'+
	'<div>'+
    '<label for="year">Enter year made</label>'+
    '<input type="number" name="year" id="year"/>'+
    '</div>'+
	'<div>'+
    '<label for="rating">Enter movie rating</label>'+
    '<input type="text" name="rating" id="rating"/>'+
    '</div>'+
	'<div>'+
    '<label for="actor">Enter lead actor</label>'+
    '<input type="text" name="actor" id="actor"/>'+
    '</div>'+
	'<div>'+
    '<label for="actress">Enter lead actress</label>'+
    '<input type="text" name="actress" id="actress"/>'+
    '</div>'
  );	
}