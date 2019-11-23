$(function() {
  
  //set url for server
  var url = window.location.hostname.startsWith("localhost")
    ? "http://localhost:5000"
    : "https://fun-times-project2.herokuapp.com";
  
  //single query title based
  $("#search").click(function(event) {
    event.preventDefault();
    $("ul").empty();
	$.get(
      `${url}/getMovie`,
      {
        title: $("#title").val(),
		list:  $("#list").val()
      },
      function(json) { 
        if (json[0] == null)
		  $("ul").append($("<li>").text(
            `No database match`
        ));
	    else
	      $("ul").append($("<li>").text(
            `${json[0].title},  ${json[0].year},  ${json[0].rating},  ${json[0].actor},  ${json[0].actress}`
        ));
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
