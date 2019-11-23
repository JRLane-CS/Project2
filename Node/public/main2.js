var stl = [.55, .7, .85, 1];//stamped letters cost
var mtl = [.5, .65, .8, .95];//metered letters cost
var lbs = [1, 2, 3, 3.5];//stamped and meters weight
//large envelopes cost
var lge = [1, 1.15, 1.3, 1.45, 1.6, 1.75, 1.9, 2.05, 2.2, 2.34, 2.5, 2.65, 2.8];
//large envelopes weight
var lbse = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
//first class package cost
var fcp = [3.66, 3.66, 3.66, 3.66, 4.39, 4.39, 4.39, 4.39, 5.19, 5.19, 5.19, 5.19, 5.71];
//first class package weight
var lbsp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];





$(function() {
  var url = window.location.hostname.startsWith("localhost")
    ? "http://localhost:5000"
    : "https://immense-thicket-27185.herokuapp.com";

  $("#form-1").submit(function(event) {
    event.preventDefault();
    $.get(
      `${url}/calculate`,
      {
        ounces: $("#weight").val(),
        mailed: $("#mail").val()
      },
      function(response) {
        $("#result").html(response);
      }
    );
  }); 
});
