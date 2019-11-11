const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {type: String, required: true},
	age: Number	
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;