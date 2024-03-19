// controllers/exhibitorController.js
const bcrypt = require('bcryptjs');
const Exhibitor = require('../models/Exhibitor');

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if email is already registered
        const existingExhibitor = await Exhibitor.findOne({ email });
        if (existingExhibitor) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new exhibitor
        const exhibitor = new Exhibitor({
            email,
            password: hashedPassword,
            name,
            // Add other fields as needed
        });

        // Save the exhibitor to the database
        await exhibitor.save();

        // Respond with success message
        res.status(201).json({ message: 'Exhibitor registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
