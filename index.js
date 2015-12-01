//Depenedencies
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");


var port = 3000;

//Express
var app = express();

//Express middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));








app.listen(port, function () {
	console.log("Listening on port " + port);
	
});