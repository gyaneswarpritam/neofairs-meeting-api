const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const config = require('../config/config');
// controllers/adminController.js
const Visitor = require('../models/Visitor');
const Exhibitor = require('../models/Exhibitor');
const { sendEmail } = require('../utils/emailService');
const { sendSMS } = require('../utils/smsService');
const adminSchema = require('../validators/adminValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.register = async (req, res) => {
    try {
        const validation = schemaValidator(adminSchema, req.body);
        if (validation.success) {
            const { email, password, username } = req.body;

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
                username,
            });

            // Save the admin to the database
            await admin.save();

            // Respond with success message
            res.status(201).json({ message: 'Admin registered successfully' });
        } else {
            res.status(401).json({ message: validation.errors });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const validation = schemaValidator(adminSchema, req.body);
        if (validation.success) {
            const { email, password } = req.body;

            // Find admin by email
            const admin = await Admin.findOne({ email, active: true });
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

exports.fetchAllVisitor = async (req, res) => {
    try {
        const reqBody = req.body;
        const { active, blocked, reject } = req.query;
        const resultsPerPage =
            reqBody["itemPerPage"] > 0 ? reqBody["itemPerPage"] : 10;
        const page = reqBody["page"] >= 1 ? reqBody["page"] : 1;
        const skip = resultsPerPage * (page - 1);
        const search = {};
        search["_id"] = { $ne: req.authID };
        search["deleted"] = { $ne: true };
        if (reqBody["email"]) {
            search["email"] = reqBody["email"];
        }
        if (reqBody["firstName"]) {
            search["firstName"] = { $regex: reqBody["firstName"], $options: "i" };
        }
        if (reqBody["phoneNo"]) {
            search["phoneNo"] = reqBody["phoneNo"];
        }
        if (active !== undefined) {
            search["active"] = active;
        }
        if (blocked !== undefined) {
            search["blocked"] = blocked;
        }
        if (reject !== undefined) {
            search["reject"] = reject;
        }
        const totalrecords = await Visitor.countDocuments(search);
        const records = await Visitor.find(search)
            .skip(skip)
            .limit(resultsPerPage)
            .lean();
        resp = {
            status: 200,
            message: "List of Visitors",
            data: records,
            totalCount: totalrecords,
            totalPages: parseInt(Math.ceil(totalrecords / resultsPerPage)),
        };
        res.status(resp.status).send(resp);
        // console.log(req.query, '****************88')
        // const allVisitors = await Visitor.find();
        // res.json({ data: allVisitors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.fetchAllExhibitor = async (req, res) => {
    try {
        const reqBody = req.body;
        const { active, blocked, reject } = req.query;
        const resultsPerPage =
            reqBody["itemPerPage"] > 0 ? reqBody["itemPerPage"] : 10;
        const page = reqBody["page"] >= 1 ? reqBody["page"] : 1;
        const skip = resultsPerPage * (page - 1);
        const search = {};
        search["_id"] = { $ne: req.authID };
        search["deleted"] = { $ne: true };
        if (reqBody["email"]) {
            search["email"] = reqBody["email"];
        }
        if (reqBody["firstName"]) {
            search["firstName"] = { $regex: reqBody["firstName"], $options: "i" };
        }
        if (reqBody["phoneNo"]) {
            search["phoneNo"] = reqBody["phoneNo"];
        }
        if (active !== undefined) {
            search["active"] = active;
        }
        if (blocked !== undefined) {
            search["blocked"] = blocked;
        }
        if (reject !== undefined) {
            search["reject"] = reject;
        }
        const totalrecords = await Exhibitor.countDocuments(search);
        const records = await Exhibitor.find(search)
            .skip(skip)
            .limit(resultsPerPage)
            .lean();
        resp = {
            status: 200,
            message: "List of Exhibitors",
            data: records,
            totalCount: totalrecords,
            totalPages: parseInt(Math.ceil(totalrecords / resultsPerPage)),
        };
        res.status(resp.status).send(resp);

        // const allExhibitors = await Exhibitor.find();
        // res.json({ data: allExhibitors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.approveVisitor = async (req, res) => {
    console.log(req.params, '$$$$$$$$$$$$!!!!!!!')
    const { visitorId } = req.params;
    try {
        // Check if the request body contains a password
        if (req.body.password) {
            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Update the password in the req.body with the hashed password
            req.body.password = hashedPassword;
        }
        const visitor = await Visitor.findByIdAndUpdate(visitorId, req.body, { new: true });
        if (!visitor) {
            return res.status(404).json({ message: 'Visitor not found' });
        }
        // await sendEmail(visitor.email, 'Approval Notification', 'Your registration has been approved.');
        // await sendSMS(visitor.phoneNumber, 'Congratulations! Your registration has been approved.');
        res.json({ message: 'Visitor approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.approveExhibitor = async (req, res) => {
    const { exhibitorId } = req.params;
    try {
        // Check if the request body contains a password
        if (req.body.password) {
            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            // Update the password in the req.body with the hashed password
            req.body.password = hashedPassword;
        }
        const exhibitor = await Exhibitor.findByIdAndUpdate(exhibitorId, req.body, { new: true });
        if (!exhibitor) {
            return res.status(404).json({ message: 'Exhibitor not found' });
        }
        // await sendEmail(exhibitor.email, 'Approval Notification', 'Your registration has been approved.');
        // await sendSMS(exhibitor.phoneNumber, 'Congratulations! Your registration has been approved.');
        res.json({ message: 'Exhibitor approved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};