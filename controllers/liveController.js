// controllers/liveController.js
const Live = require('../models/Live');
const liveSchema = require('../validators/liveValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createLive = async (req, res) => {
    try {
        const validatedData = schemaValidator(liveSchema, req.body);
        const live = await Live.create(validatedData);
        res.status(201).json(live);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllLive = async (req, res) => {
    try {
        const live = await Live.find({});
        if (!live) {
            return res.status(404).json({ message: 'Live not found' });
        }
        res.json(live);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLiveById = async (req, res) => {
    try {
        const live = await Live.findById(req.params.id);
        if (!live) {
            return res.status(404).json({ message: 'Live entry not found' });
        }
        res.json(live);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLive = async (req, res) => {
    try {
        const validatedData = schemaValidator(liveSchema, req.body);
        const live = await Live.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!live) {
            return res.status(404).json({ message: 'Live entry not found' });
        }
        res.json(live);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteLive = async (req, res) => {
    try {
        const live = await Live.findByIdAndDelete(req.params.id);
        if (!live) {
            return res.status(404).json({ message: 'Live entry not found' });
        }
        res.json({ message: 'Live entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
