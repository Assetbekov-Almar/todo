const Todo = require('../models/todos');
const asyncHandler = require('express-async-handler');
const isIsoDate = require('../utils/isIsoDate');
const { body, validationResult } = require('express-validator');

const get_all_todos = asyncHandler(async (req, res) => {
    const todos = await Todo.find().exec();
    res.send({ todos });
});

const create_todo = [
    body('description').notEmpty().withMessage('description is required'),
    body('deadline').notEmpty().withMessage('deadline is required'),

    asyncHandler(async (req, res) => {
        const { description, deadline } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(400).send(errorMessages);
        }

        if (!isIsoDate(deadline)) {
            return res.status(400).send('Invalid deadline date');
        }
        const date = new Date(deadline);
        const todo = new Todo({ description, deadline: date, status: 'active' });
        await todo.save();
        res.sendStatus(201);
    }),
];

const update_todo = asyncHandler(async (req, res) => {
    const { id, description, deadline, status } = req.body;

    if (deadline && !isIsoDate(deadline)) {
        return res.status(400).send('Invalid deadline date');
    }

    const updatedTodo = await Todo.findOneAndUpdate({ id }, { $set: { description, deadline, status } });
    console.log(updatedTodo);

    if (updatedTodo) {
        return res.sendStatus(200);
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
