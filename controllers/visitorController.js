// controllers/visitorController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Visitor = require('../models/Visitor');
const authService = require('../services/authService');
const config = require('../config/config');
const schemaValidator = require('../validators/schemaValidator');
const visitorSchema = require('../validators/visitorValidator');

exports.register = async (req, res) => {
    try {
        const validation = schemaValidator(visitorSchema, req.body);
        if (validation.success) {
            const { email } = req.body;
            // Check if email is already registered
            const existingVisitor = await Visitor.findOne({ email });
            if (existingVisitor) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Create a new visitor
            const visitor = new Visitor(req.body);

            // Save the visitor to the database
            await visitor.save();

            // Respond with success message
            res.status(201).json({ message: 'Visitor registered successfully' });
        } else {
            res.status(401).json({ message: validation.errors });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('visitor-login', { session: false }, (err, visitor, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!visitor) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
        const token = jwt.sign({ sub: visitor._id }, config.jwtSecret);
        res.json({ token });
    })(req, res, next);
};