const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/calculate", (req, res) => {
    var stl = [.55, .7, .85, 1, 1.45, 1.6, 1.75, 1.9, 2.05, 2.2, 2.34, 2.5, 2.65, 2.8];//stamped letters cost
    var mtl = [.5, .65, .8, .95, 1.45, 1.6, 1.75, 1.9, 2.05, 2.2, 2.34, 2.5, 2.65, 2.8];//metered letters cost
    var lbs = [1, 2, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];//stamped and meters weight
    //large envelopes cost
    var lge = [1, 1.15, 1.3, 1.45, 1.6, 1.75, 1.9, 2.05, 2.2, 2.34, 2.5, 2.65, 2.8];
    //large envelopes weight
    var lbse = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    //first class package cost
    var fcp = [3.66, 3.66, 3.66, 3.66, 4.39, 4.39, 4.39, 4.39, 5.19, 5.19, 5.19, 5.19, 5.71, 8.68, 10.28];
    //first class package weight
    var lbsp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 32];
    var types = ['Stamped Letter', 'Metered Letter', 'Large Envelope - Flat', 'First Class Package'];
    var cost = 0;
    var ounces;
    var message;
    var weight = req.query.weight;
    var mail = req.query.mail;

    if (mail == 0) {
	  for (x = 0; x < 14; x++ ){
		if (weight <= lbs[x]){
		  cost = stl[x];
		};
	  };
    };
    if (mail == 1) {
	  for (x = 0; x < 14; x++ ){
		if (weight <= lbs[x]){
			cost = mtl[x];
		};
      };
    };
    if (mail == 2) {
	  for (x = 0; x < 13; x++ ){
		if (weight <= lbse[x]){
			cost = lge[x];
		};
	  };
    };
    if (mail == 3) {
	  for (x =0; x < 15; x++ ){
		if (weight <= lbsp[x]){
			cost = fcp[x];
		};
	  };
    };

    cost = cost.toFixed(2);
	
    if (cost > 0) {
	  message = "Cost is: $"+cost;
	}
    else {
	  message = "Your package is too heavy!"
    }

    res.render("calculate", {mail: types[mail], weight: weight, message: message});
    res.end();
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
