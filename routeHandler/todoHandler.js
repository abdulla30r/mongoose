const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

//GET all TODO
router.get("/", async (req, res) => {
	await Todo.find()
		.select({
			_id: 0,
			__v: 0,
			date: 0,
		})
		.then(data =>
			res.status(200).json({
				result: data,
			})
		)
		.catch(err => {
			res.status(500).json({
				error: err.message,
			});
		});
});

//GET A TODO by ID
router.get("/:id", async (req, res) => {
	await Todo.find({ _id: req.params.id })
		.select({
			_id: 0,
			__v: 0,
			date: 0,
		})
		.then(data =>
			res.status(200).json({
				result: data,
			})
		)
		.catch(err => {
			res.status(500).json({
				error: err.message,
			});
		});
});

//POST a TODO
router.post("/", async (req, res) => {
	const newTodo = new Todo(req.body);
	newTodo
		.save()
		.then(() =>
			res.status(200).json({
				message: "Todo was inserted successfully",
			})
		)
		.catch(err => {
			res.status(500).json({
				error: err.message,
			});
		});
});

//POST MULTIPLE TODO
router.post("/all", async (req, res) => {
	await Todo.insertMany(req.body)
		.then(() => {
			res.status(200).json({
				message: "Todos were inserted successfully",
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err.message,
			});
		});
});

//PUT TODO
router.put("/:id", async (req, res) => {
	await Todo.updateOne(
		{ _id: req.params.id },
		{
			$set: { title: "My chick" },
		}
	)
		.then(() => {
			res.status(200).json({
				message: "Todos was updated successfully",
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err.message,
			});
		});
});

//DELETE TODO
// DELETE TODO
router.delete("/:id", async (req, res) => {
	try {
		const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
		if (!deletedTodo) {
			return res.status(404).json({ message: "Todo not found" });
		}
		res.status(200).json({ message: "Todo was deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
