const express = require("express");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler")

const app = express();
app.use(express.json());

//database connection
mongoose
	.connect("mongodb://localhost/todos")
	.then(() => console.log("Connection Successfull"))
	.catch(err => console.log(err));

app.use("/todo", todoHandler);

//default error handler
function errorHanlder(err, req, res, next) {
	if (res.headersSent) {
		return next(err);
	}
	res.status(500).json({ error: err });
}

app.listen(3000, () => {
	console.log("Listenig on port 3000");
});
