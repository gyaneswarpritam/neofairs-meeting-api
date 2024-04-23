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
const stripe = require('stripe')(process.env.STRIPE_SK_KEY);

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
                            id: visitor.id
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
