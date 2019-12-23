// Import
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
// Mount express on app 
const app = express();
// Port
const PORT = process.env.PORT || 3000;

// Middlewares
mongoose.connect("mongodb://localhost:27017/sample", {useNewUrlParser: true}, err => err ? console.log(err) : console.log("Mongo is connected!!"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Routes
app.get("/users", (req, res, next) => {
	User.find({}, (err, users) => {
		if (err) return next(err);
		res.json(users);
	});
});

app.get("/users/:id", (req, res, next) => {
	// Takes string as an argument which should be an ID, it finds a single document associated with that ID
	User.findById(req.params.id, (err, user) => {
		if (err) return next(err);
		res.json(user);
	});
	// Takes obj as argument, finds documents that match the value in obj and return an array of documents
	User.find({_id: req.params.id}, (err, user) => {
		if (err) return next(err);
		res.json(user);
	});
	// Takes obj as argument, finds single document that matches the value in obj and return it
	User.findOne({_id: req.params.id}, (err, user) => {
		if (err) return next(err);
		res.json(user);
	});
});

app.post("/users", (req, res, next) => {
	User.create(req.body, (err, createdData) => {
		if (err) return next(err);
		res.json(createdData);
	});
});

app.put("/users/:id", (req, res, next) => {
	// Finds all documets associated with query and updates all, return the Mongo response
	User.update({_id: req.params.id}, req.body, (err, data) => {
		if (err) return next(err);
		res.json(data);
	});
	// Finds one document associated with query and updates it, returns the Mongo response
	User.updateOne({_id: req.params.id}, req.body, (err, data) => {
		if (err) return next(err);
		res.json(data);
	});
	// Finds by Id, returns previous data
	User.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
		if (err) return next(err);
		res.json(data);
	});
});

app.delete("/users/:id", (req, res, next) => {
	User.findByIdAndDelete(req.params.id, (err, data) => {
		if (err) return next(err);
		res.json(data);
	});
});

app.use((req, res) => {
	res.send("<h1>404: Not Found</h1>");
});

app.use((err, req, res, next) => {
	res.send(err);
});

// Server
app.listen(PORT, () => {
	console.log("listening on PORT:", PORT);
});