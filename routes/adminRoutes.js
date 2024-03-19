// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminController = require('../controllers/adminController');

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/fetch-all-visitor', passport.authenticate('jwt-admin', { session: false }),
    adminController.fetchAllVisitor);
router.get('/fetch-all-exhivitor', passport.authenticate('jwt-admin', { session: false }),
    adminController.fetchAllExhibitor);
router.put('/approve-visitor/:visitorId', passport.authenticate('jwt-admin', { session: false }),
    adminController.approveVisitor);

module.exports = router;
