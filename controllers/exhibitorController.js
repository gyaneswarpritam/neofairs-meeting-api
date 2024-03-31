// controllers/exhibitorController.js
const bcrypt = require('bcryptjs');
const Exhibitor = require('../models/Exhibitor');
const { exhibitorSchema, exhibitorLoginSchema } = require('../validators/exhibitorValidator');
const schemaValidator = require('../validators/schemaValidator');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

exports.register = async (req, res) => {
    try {
        const validation = schemaValidator(exhibitorSchema, req.body);
        if (validation.success) {
            const { email } = req.body;

            // Check if email is already registered
            const existingExhibitor = await Exhibitor.findOne({ email });
            if (existingExhibitor) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Create a new exhibitor
            const exhibitor = new Exhibitor(req.body);

            // Save the exhibitor to the database
            await exhibitor.save();

            // Respond with success message
            res.status(201).json({ message: 'Exhibitor registered successfully' });
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
        const validation = schemaValidator(exhibitorLoginSchema, req.body);
        if (validation.success) {
            const { email, password } = req.body;
            const exhibitor = await Exhibitor.findOne({ email, active: true });
            if (!exhibitor) {
                return res.status(404).json({ message: 'Exhibitor not found' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, exhibitor.password);
            if (isMatch) {
                // Create JWT Payload
                const payload = {
                    id: exhibitor.id,
                    email: exhibitor.email
                };

                // Sign token
                jwt.sign(
                    payload,
                    jwtSecret,
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