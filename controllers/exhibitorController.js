// controllers/exhibitorController.js
const bcrypt = require('bcryptjs');
const Exhibitor = require('../models/Exhibitor');
const { exhibitorSchema, exhibitorLoginSchema } = require('../validators/exhibitorValidator');
const schemaValidator = require('../validators/schemaValidator');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');
const { successResponse, notFoundResponse } = require('../utils/sendResponse');
const emailController = require("./emailController");

exports.register = async (req, res) => {
    try {
        const validation = schemaValidator(exhibitorSchema, req.body);
        if (validation.success) {
            const { email } = req.body;

            // Check if email is already registered
            const existingExhibitor = await Exhibitor.findOne({ email });
            if (existingExhibitor) {
                return res.status(500).json({ status: 0, message: 'Email already exists' });
            }

            // Create a new exhibitor
            const exhibitor = new Exhibitor(req.body);

            // Save the exhibitor to the database
            await exhibitor.save();
            const emailData = await emailController.sendRegisteredMail(exhibitor);
            // Respond with success message
            res.status(201).json({ status: 1, message: 'Exhibitor registered successfully' });
        } else {
            res.status(401).json({ status: 0, message: validation.errors });
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
                return res.status(404).json({ status: 0, message: 'Exhibitor not found' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, exhibitor.password);
            if (isMatch) {
                const currentDate = new Date();
                const utcFormat = currentDate.toISOString();
                const updatedLoggeduser = await Exhibitor.findByIdAndUpdate(exhibitor.id,
                    {
                        loggedIn: true,
                        loggedInIP: req.body.loggedInIP,
                        loggedInTime: utcFormat
                    }, { new: true });

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
                            token: 'Bearer ' + token,
                            id: exhibitor.id,
                            name: exhibitor.firstName + " " + exhibitor.lastName
                        });
                    }
                );
            } else {
                return res.status(400).json({ status: 0, message: 'Username/Password is incorrect' });
            }
        } else {
            res.status(401).json({ status: 0, message: validation.errors });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, message: 'Internal server error' });
    }
};
exports.getAllExhibitor = async (req, res) => {
    try {
        const exhibitors = await Exhibitor.find({});
        if (!exhibitors || exhibitors.length === 0) {
            return res.status(404).json({ message: 'No exhibitors found' });
        }
        const modifiedExhibitors = exhibitors.map(exhibitor => ({
            _id: exhibitor._id,
            firstName: exhibitor.firstName,
            lastName: exhibitor.lastName,
            email: exhibitor.email,
            companyName: exhibitor.companyName
        }));
        const successObj = successResponse('Exhibitor List', modifiedExhibitors);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllLoggedInExhibitorList = async (req, res) => {
    try {
        const exhibitor = await Exhibitor.find({ loggedIn: true });
        if (exhibitor.length == 0) {
            const successObj = notFoundResponse('No exhibitor List');
            res.status(successObj.status).send(successObj);
            return;
        }
        const modifiedexhibitors = exhibitor.map(exhibitor => ({
            _id: exhibitor._id,
            name: exhibitor.firstName + " " + exhibitor.lastName,
            phoneNo: exhibitor.phoneNo,
            email: exhibitor.email,
            companyName: exhibitor.companyName,
            loggedInTime: exhibitor.loggedInTime,
            loggedInIP: exhibitor.loggedInIP
        }));
        const successObj = successResponse('exhibitor List', modifiedexhibitors);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllJoinedExhibitorList = async (req, res) => {
    try {
        const exhibitor = await Exhibitor.find({ active: true });
        if (exhibitor.length == 0) {
            const successObj = notFoundResponse('No exhibitor List');
            res.status(successObj.status).send(successObj);
            return;
        }
        const modifiedexhibitors = exhibitor.map(exhibitor => ({
            _id: exhibitor._id,
            name: exhibitor.firstName + " " + exhibitor.lastName,
            phoneNo: exhibitor.phoneNo,
            email: exhibitor.email,
            companyName: exhibitor.companyName,
            loggedInTime: exhibitor.loggedInTime,
            loggedInIP: exhibitor.loggedInIP
        }));
        const successObj = successResponse('exhibitor List', modifiedexhibitors);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getExhibitorById = async (req, res) => {
    try {
        const exhibitor = await Exhibitor.findById(req.params.id);
        if (!exhibitor) {
            return res.status(404).json({ message: 'Exhibitor entry not found' });
        }
        const modifiedExhibitor = {
            _id: exhibitor._id,
            firstName: exhibitor.firstName,
            lastName: exhibitor.lastName,
            email: exhibitor.email,
            companyName: exhibitor.companyName
        };
        const successObj = successResponse('Exhibitor Details', modifiedExhibitor);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
