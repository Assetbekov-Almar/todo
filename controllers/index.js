const Todo = require('../models/todos');

exports.get_all_todos = async (req, res) => {
    const todos = await Todo.find().exec();
    console.log(todos);
    res.send({ todos });
};
