// controllers/eventController.js
const Event = require('../models/Event');
const eventSchema = require('../validators/eventValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createEvent = async (req, res) => {
    try {
        const validatedData = schemaValidator(eventSchema, req.body);
        const event = await Event.create(validatedData);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllEvent = async (req, res) => {
    try {
        const event = await Event.find({});
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const validatedData = schemaValidator(eventSchema, req.body);
        const event = await Event.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ message: 'Event deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
