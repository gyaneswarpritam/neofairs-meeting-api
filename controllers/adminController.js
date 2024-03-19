const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const config = require('../config/config');
// controllers/adminController.js
const Visitor = require('../models/Visitor');
const Exhibitor = require('../models/Exhibitor');
const { sendEmail } = require('../utils/emailService');
const { sendSMS } = require('../utils/smsService');

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if email is already registered
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const admin = new Admin({
            email,
            password: hashedPassword,
            name,
            // Add other fields as needed
        });

        // Save the admin to the database
        await admin.save();

        // Respond with success message
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (isMatch) {
            // Create JWT Payload
            const payload = {
                id: admin.id,
                email: admin.email
            };

            // Sign token
            jwt.sign(
                payload,
                config.jwtSecret,
                { expiresIn: 3600 },
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
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.fetchAllVisitor = async (req, res) => {
    try {
        const allVisitors = await Visitor.find();
        res.json({ data: allVisitors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.fetchAllExhibitor = async (req, res) => {
    try {
        const allExhibitors = await Exhibitor.find();
        res.json({ data: allExhibitors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.approveVisitor = async (req, res) => {
    const { visitorId } = req.params;
    try {
        const visitor = await Visitor.findByIdAndUpdate(visitorId, { approved: true }, { new: true });
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        await sendEmail(visitor.email, 'Approval Notification', 'Your registration has been approved.');
        await sendSMS(visitor.phoneNumber, 'Congratulations! Your registration has been approved.');
        res.json({ message: 'Visitor approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};