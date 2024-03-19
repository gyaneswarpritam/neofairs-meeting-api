// routes/exhibitorRoutes.js
const express = require('express');
const router = express.Router();
const exhibitorController = require('../controllers/exhibitorController');
const passport = require('passport');

router.post('/register', exhibitorController.register);

module.exports = router;
