const express = require('express');
const router = express.Router();
const passport = require('passport');
const { jwtSecret } = require('../config/config');

const hallController = require('../controllers/hallController');
const visitorController = require('../controllers/visitorController');
const exhibitorController = require('../controllers/exhibitorController');

// Configure JWT Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};

passport.use('jwt-visitor', new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    // Extract the fields from the payload
    const { id, email } = jwtPayload;

    // Here you can add additional checks if needed
    if (id && email) {
        return done(null, jwtPayload); // Authentication successful
    } else {
        return done(null, false); // Authentication failed
    }
}));

router.post('/register', visitorController.register);
router.post('/login', visitorController.login);

/*Stripe Checkout for registration*/
router.post('/create-checkout-session', visitorController.createCheckout);

/*Hall Route*/
router.get('/hall', passport.authenticate('jwt-visitor', { session: false }), hallController.getAllHall);
router.get('/hall/:id', passport.authenticate('jwt-visitor', { session: false }), hallController.getHallById);

/*Exhibitor List Route*/
router.get('/exhibitorList', passport.authenticate('jwt-visitor', { session: false }), exhibitorController.getAllExhibitor);
router.get('/exhibitorById/:id', passport.authenticate('jwt-visitor', { session: false }), exhibitorController.getExhibitorById);

/*Exhibitor List Route*/
router.get('/visitorList', passport.authenticate('jwt-visitor', { session: false }), visitorController.getAllVisitor);
router.get('/visitorById/:id', passport.authenticate('jwt-visitor', { session: false }), visitorController.getVisitorById);

module.exports = router;
