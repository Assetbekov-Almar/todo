const express = require('express');

const router = express.Router();
const controller = require('../controllers');

router.get('/', controller.get_all_todos);

module.exports = router;