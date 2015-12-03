var mongoose = require("mongoose");

var userModel = mongoose.Schema({
	firstName: {type: String},
	lastName: {type: String},
	password: {type: String},
	trips: [{type: mongoose.Schema.Types.ObjectId, ref: "Trip"}]
});


module.exports = mongoose.model("user", userModel);