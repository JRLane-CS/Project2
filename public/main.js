

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
})

$("#addMovie").click(function(event) {
  $("#header").text("Add Movie"); 
  $("#functions").empty(); 	
})

$("#updateMovie").click(function(event) {
  $("#header").text("Update Movie"); 
  $("#functions").empty(); 	
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