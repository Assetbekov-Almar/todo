const express = require('express');

const router = express.Router();
const controller = require('../controllers');

router.get('/', controller.get_all_todos);
router.post('/create', controller.create_todo);
router.patch('/update', controller.update_todo);
router.delete('/delete', controller.delete_todo);

module.exports = router;
