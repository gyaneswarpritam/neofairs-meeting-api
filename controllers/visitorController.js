// controllers/visitorController.js
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Visitor = require('../models/Visitor');
const authService = require('../services/authService');
const config = require('../config/config');
const schemaValidator = require('../validators/schemaValidator');
const { visitorSchema, visitorLoginSchema } = require('../validators/visitorValidator');
const emailController = require("./emailController");

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
            const visitorData = await visitor.save();
            const emailData = await emailController.sendRegisteredMail(visitorData);
            console.log(emailData, '^^^^^^^^^^^^^6')
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

exports.login = async (req, res, next) => {
    try {
        const validation = schemaValidator(visitorLoginSchema, req.body);
        if (validation.success) {
            const { email, password } = req.body;

            // Find admin by email
            const visitor = await Visitor.findOne({ email, active: true });
            if (!visitor) {
                return res.status(404).json({ message: 'Visitor not found' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, visitor.password);
            if (isMatch) {
                // Create JWT Payload
                const payload = {
                    id: visitor.id,
                    email: visitor.email
                };

                // Sign token
                jwt.sign(
                    payload,
                    config.jwtSecret,
                    { expiresIn: '3650d' },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ message: 'Username/Password is incorrect' });
            }
        } else {
            res.status(401).json({ message: validation.errors });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};