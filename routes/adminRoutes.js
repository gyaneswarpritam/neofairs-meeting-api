// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminController = require('../controllers/adminController');
const { jwtSecret } = require('../config/config');

// Configure JWT Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};

passport.use('jwt-admin', new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    // Extract the fields from the payload
    const { id, email } = jwtPayload;

    // Here you can add additional checks if needed
    if (id && email) {
        return done(null, jwtPayload); // Authentication successful
    } else {
        return done(null, false); // Authentication failed
    }
}));

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.post('/fetch-all-visitor', passport.authenticate('jwt-admin', { session: false }),
    adminController.fetchAllVisitor);
router.post('/fetch-all-exhibitor', passport.authenticate('jwt-admin', { session: false }),
    adminController.fetchAllExhibitor);
router.put('/approve-visitor/:visitorId', passport.authenticate('jwt-admin', { session: false }),
    adminController.approveVisitor);

module.exports = router;
