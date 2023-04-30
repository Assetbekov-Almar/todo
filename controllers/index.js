const Todo = require('../models/todos');
const asyncHandler = require('express-async-handler');

const get_all_todos = asyncHandler(async (req, res) => {
    const todos = await Todo.find().exec();
    res.send({ todos });
});

const create_todo = asyncHandler(async (req, res) => {
    const { description } = req.body;
    const todo = new Todo({ description });
    await todo.save();
    res.sendStatus(201);
});

const update_todo = asyncHandler(async (req, res) => {
    const { id, description } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate({ id }, { $set: { description } });
    if (updatedTodo) {
        res.sendStatus(200);
    }
    res.status(404).send('Todo is not found.');
});

const delete_todo = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const deletedTodo = await Todo.findOneAndDelete({ id });
    if (deletedTodo) {
        res.sendStatus(200);
    }
    res.status(404).send('Todo is not found.');
});

module.exports = {
    get_all_todos,
    create_todo,
    update_todo,
    delete_todo,
};
