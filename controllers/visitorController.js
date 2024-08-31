// controllers/visitorController.js
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Visitor = require('../models/Visitor');
const authService = require('../services/authService');
const { jwtSecret, base_url } = require('../config/config');
const schemaValidator = require('../validators/schemaValidator');
const { visitorSchema, visitorLoginSchema } = require('../validators/visitorValidator');
const emailController = require("./emailController");
const { successResponse, notFoundResponse } = require('../utils/sendResponse');
const Exhibitor = require('../models/Exhibitor');
const Stall = require('../models/Stall');
const stripe = require('stripe')(process.env.STRIPE_SK_KEY);
const crypto = require('crypto');

exports.register = async (req, res) => {
    try {
        const validation = schemaValidator(visitorSchema, req.body);
        if (validation.success) {
            const { email } = req.body;
            // Check if email is already registered
            const existingVisitor = await Visitor.findOne({ email });
            if (existingVisitor) {
                return res.status(400).json({ status: 0, message: 'Email already exists' });
            }

            // Create a new visitor
            const visitor = new Visitor(req.body);

            // Save the visitor to the database
            const visitorData = await visitor.save();
            const emailData = await emailController.sendRegisteredMail(visitorData);
            // Respond with success message
            res.status(201).json({ status: 1, message: 'Visitor registered successfully' });
        } else {
            res.status(401).json({ message: validation.errors });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, message: 'Internal server error' });
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
                return res.status(404).json({ status: 0, message: 'Visitor not found' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, visitor.password);
            if (isMatch) {
                const currentDate = new Date();
                const utcFormat = currentDate.toISOString();
                const updatedLoggeduser = await Visitor.findByIdAndUpdate(visitor.id,
                    {
                        loggedIn: true,
                        loggedInIP: req.body.loggedInIP,
                        loggedInTime: utcFormat
                    }, { new: true });
                // Create JWT Payload
                const payload = {
                    id: visitor.id,
                    email: visitor.email
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
                            id: visitor.id,
                            name: visitor.firstName + " " + visitor.lastName
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

function generateRandomPassword(length = 8) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let password = '';

    // Ensure at least one character from each required set
    password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Fill the rest of the password length with random characters from all sets
    const allChars = uppercaseChars + lowercaseChars + numbers + specialChars;
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    // Shuffle the password to avoid predictable sequences
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the email exists
        const visitor = await Visitor.findOne({ email });
        if (!visitor) {
            return res.status(404).json({ status: 0, message: 'Email not found' });
        }

        // Generate a random password
        const randomPassword = generateRandomPassword();

        // Hash the new password before saving (use bcrypt or similar)
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        // Update the user's password
        visitor.password = hashedPassword;
        await visitor.save();

        // Send the new password to the user's email
        const forgot = await emailController.sendForgotPassword(visitor, randomPassword);
        console.log(forgot, '&&&&&&&&&&')
        // Respond with success message
        res.status(200).json({ status: 1, message: 'Password reset successfully. Please check your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, message: 'Internal server error' });
    }
};

exports.loggedOut = async (req, res, next) => {
    try {

        const loggedOutUpdate = await Visitor.findByIdAndUpdate(req.params.id, { loggedIn: false }, { new: true });

        if (loggedOutUpdate) {
            res.json({
                success: true,
                message: "Logged out"
            });
        } else {
            res.status(401).json({ message: validation.errors });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllVisitor = async (req, res) => {
    try {
        const visitors = await Visitor.find({});
        if (!visitors || visitors.length === 0) {
            return res.status(404).json({ message: 'No visitors found' });
        }
        const modifiedVisitors = visitors.map(visitor => ({
            _id: visitor._id,
            firstName: visitor.firstName,
            lastName: visitor.lastName,
            email: visitor.email,
            companyName: visitor.companyName,
        }));
        const successObj = successResponse('Visitor List', modifiedVisitors);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllChatVisitor = async (req, res) => {
    try {
        const visitors = await Visitor.find({ _id: { $ne: req.params.id }, active: true });

        if (!visitors || visitors.length === 0) {
            return res.status(404).json({ message: 'No visitors found' });
        }
        const modifiedVisitors = visitors.map(visitor => ({
            _id: visitor._id,
            firstName: visitor.firstName,
            lastName: visitor.lastName,
            email: visitor.email,
            companyName: visitor.companyName,
        }));

        const successObj = successResponse('Visitor List', modifiedVisitors);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllLoggedInVisitor = async (req, res) => {
    try {
        const visitorsCount = await Visitor.countDocuments({ loggedIn: true });

        const successObj = successResponse('Visitor Count', visitorsCount);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllLoggedInVisitorList = async (req, res) => {
    try {
        const visitor = await Visitor.find({ loggedIn: true });
        if (visitor.length == 0) {
            const successObj = notFoundResponse('No Visitor List');
            res.status(successObj.status).send(successObj);
            return;
        }
        const modifiedVisitors = visitor.map(visitor => ({
            _id: visitor._id,
            name: visitor.firstName + " " + visitor.lastName,
            phoneNo: visitor.phoneNo,
            email: visitor.email,
            companyName: visitor.companyName,
            loggedInTime: visitor.loggedInTime,
            loggedInIP: visitor.loggedInIP
        }));
        const successObj = successResponse('Visitor List', modifiedVisitors);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllJoinedVisitorList = async (req, res) => {
    try {
        const visitor = await Visitor.find({ active: true });
        if (visitor.length == 0) {
            const successObj = notFoundResponse('No Visitor List');
            res.status(successObj.status).send(successObj);
            return;
        }
        const modifiedVisitors = visitor.map(visitor => ({
            _id: visitor._id,
            name: visitor.firstName + " " + visitor.lastName,
            phoneNo: visitor.phoneNo,
            email: visitor.email,
            companyName: visitor.companyName,
            loggedInTime: visitor.loggedInTime,
            loggedInIP: visitor.loggedInIP
        }));
        const successObj = successResponse('Visitor List', modifiedVisitors);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id);
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor entry not found' });
        }
        const modifiedVisitor = {
            _id: visitor._id,
            firstName: visitor.firstName,
            lastName: visitor.lastName,
            email: visitor.email,
            companyName: visitor.companyName
        };
        const successObj = successResponse('Visitor Details', modifiedVisitor);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCheckout = async (req, res) => {
    try {
        const { products } = req.body;
        const lineItems = products.map((product) => ({
            price_data: {
                currency: product.currency,
                product_data: {
                    name: product.name,
                },
                unit_amount: product.price * 100
            },
            quantity: product.quantity,
        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${base_url}success`,
            // metadata: {
            //     username: 'Pritam Gyaneswar 1',
            //     userId: 'example_user_id'
            // }
        });
        res.json({ id: session.id })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.matchMaking = async (req, res) => {
    const visitorId = req.params.visitorId;

    try {
        // Find the visitor by ID
        const visitor = await Visitor.findById(visitorId);

        // If visitor not found, return error
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }

        // Array to store exhibitors with matching percentage
        const matchedExhibitors = [];

        // Find all exhibitors where active is true
        const exhibitors = await Exhibitor.find({ active: true });

        // Calculate matching percentage for each exhibitor
        for (const exhibitor of exhibitors) {
            let matchCount = 0;
            let totalProducts = 0;

            // Loop through each product category of the visitor
            Object.keys(visitor.productInfo).forEach(category => {
                // Check if exhibitor has the same category
                if (exhibitor.productInfo.hasOwnProperty(category)) {
                    const visitorProducts = visitor.productInfo[category];
                    const exhibitorProducts = exhibitor.productInfo[category];

                    // If both products are arrays, count matching products
                    if (Array.isArray(visitorProducts) && Array.isArray(exhibitorProducts)) {
                        visitorProducts.forEach(product => {
                            if (exhibitorProducts.includes(product)) {
                                matchCount++;
                            }
                        });
                        totalProducts += visitorProducts.length;
                    } else {
                        // If not arrays, compare directly
                        if (visitorProducts === exhibitorProducts) {
                            matchCount++;
                        }
                        totalProducts++;
                    }
                }
            });

            // Calculate matching percentage
            const matchingPercentage = (matchCount / totalProducts) * 100;

            // Get the stall associated with the exhibitor
            const stall = await Stall.findOne({ exhibitor: exhibitor._id });

            // Add exhibitor, matching percentage, and stall ID to array
            if (stall) {
                matchedExhibitors.push({
                    exhibitorName: exhibitor.companyName,
                    matchingPercentage: matchingPercentage.toFixed(2) + '%',
                    stallId: stall._id
                });
            }
        }

        // Sort exhibitors by matching percentage in descending order
        matchedExhibitors.sort((a, b) => b.matchingPercentage - a.matchingPercentage);

        // Get top 5 exhibitors with percentage
        const top5Exhibitors = matchedExhibitors.slice(0, 5);

        const successObj = successResponse('Match Making List', top5Exhibitors);
        res.status(successObj.status).send(successObj);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};