const mongoose = require("mongoose");

module.exports = mongoose.model("weatrixrollog",
	new mongoose.Schema({
		user: String,
		roller: Array,
	}),
);