const Todo = require('../models/todos');
const asyncHandler = require('express-async-handler');

const get_all_todos = asyncHandler(async (req, res) => {
    const todos = await Todo.find().exec();
    res.send({ todos });
});

const create_todo = asyncHandler(async (req, res) => {
    const { description } = req.body;
    const todo = await new Todo({ description });
    await todo.save();
    res.sendStatus(201);
});

module.exports = {
    get_all_todos,
    create_todo,
};
