// controllers/exhibitorController.js
const bcrypt = require('bcryptjs');
const Exhibitor = require('../models/Exhibitor');
const exhibitorSchema = require('../validators/exhibitorValidator');
const schemaValidator = require('../validators/schemaValidator');

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
