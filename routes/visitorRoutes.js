const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');

router.post('/register', visitorController.register);
router.post('/login', visitorController.login);

module.exports = router;
