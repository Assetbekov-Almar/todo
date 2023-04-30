const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
        description: String,
        deadline: Date,
        status: {
            type: String,
            enum: ['active', 'done'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Todo', TodoSchema);
