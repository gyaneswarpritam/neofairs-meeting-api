// routes/exhibitorRoutes.js
const express = require('express');
const router = express.Router();
const exhibitorController = require('../controllers/exhibitorController');
const stallController = require('../controllers/stallController');
const hallController = require('../controllers/hallController');
const passport = require('passport');
const { jwtSecret } = require('../config/config');
const directoryController = require('../controllers/directoryController');
const visualController = require('../controllers/visualController');
const mediaController = require('../controllers/mediaController');
const faqController = require('../controllers/faqController');

// Configure JWT Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};

passport.use('jwt-exhibitor', new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    // Extract the fields from the payload
    const { id, email } = jwtPayload;

    // Here you can add additional checks if needed
    if (id && email) {
        return done(null, jwtPayload); // Authentication successful
    } else {
        return done(null, false); // Authentication failed
    }
}));

router.post('/register', exhibitorController.register);
router.post('/login', exhibitorController.login);

/*Stall Route*/
router.post('/stall', passport.authenticate('jwt-exhibitor', { session: false }), stallController.createStall);
router.get('/stall/:id', passport.authenticate('jwt-exhibitor', { session: false }), stallController.getStallById);
router.get('/stall-by-exhibitor/:exhibitor', passport.authenticate('jwt-exhibitor', { session: false }), stallController.getStallByExhibitor);
router.put('/stall/:id', passport.authenticate('jwt-exhibitor', { session: false }), stallController.updateStall);
router.delete('/stall/:id', passport.authenticate('jwt-exhibitor', { session: false }), stallController.deleteStall);

/*Hall Route*/
router.get('/hall', passport.authenticate('jwt-exhibitor', { session: false }), hallController.getAllHall);
router.get('/hall/:id', passport.authenticate('jwt-exhibitor', { session: false }), hallController.getHallById);

/*Resource Center Route*/
router.get('/directory', passport.authenticate('jwt-exhibitor', { session: false }), directoryController.getAllDirectory);
router.get('/visual', passport.authenticate('jwt-exhibitor', { session: false }), visualController.getAllVisual);
router.get('/media', passport.authenticate('jwt-exhibitor', { session: false }), mediaController.getAllMedia);
router.get('/faq', passport.authenticate('jwt-exhibitor', { session: false }), faqController.getAllFaq);

module.exports = router;
