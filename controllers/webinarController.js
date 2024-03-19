// controllers/webinarController.js
const Webinar = require('../models/Webinar');
const webinarSchema = require('../validators/webinarValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createWebinar = async (req, res) => {
    try {
        const validatedData = schemaValidator(webinarSchema, req.body);
        const webinar = await Webinar.create(validatedData);
        res.status(201).json(webinar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getWebinarById = async (req, res) => {
    try {
        const webinar = await Webinar.findById(req.params.id);
        if (!webinar) {
            return res.status(404).json({ message: 'Webinar entry not found' });
        }
        res.json(webinar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateWebinar = async (req, res) => {
    try {
        const validatedData = schemaValidator(webinarSchema, req.body);
        const webinar = await Webinar.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!webinar) {
            return res.status(404).json({ message: 'Webinar entry not found' });
        }
        res.json(webinar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteWebinar = async (req, res) => {
    try {
        const webinar = await Webinar.findByIdAndDelete(req.params.id);
        if (!webinar) {
            return res.status(404).json({ message: 'Webinar entry not found' });
        }
        res.json({ message: 'Webinar entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
