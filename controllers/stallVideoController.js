// controllers/stallVideoController.js
const StallVideo = require('../models/StallVideo');
const stallVideoSchema = require('../validators/stallVideoValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createStallVideo = async (req, res) => {
    try {
        const validatedData = schemaValidator(stallVideoSchema, req.body);
        const stallVideo = await StallVideo.create(validatedData);
        res.status(201).json(stallVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getStallVideoById = async (req, res) => {
    try {
        const stallVideo = await StallVideo.findById(req.params.id);
        if (!stallVideo) {
            return res.status(404).json({ message: 'Stall video entry not found' });
        }
        res.json(stallVideo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStallVideo = async (req, res) => {
    try {
        const validatedData = schemaValidator(stallVideoSchema, req.body);
        const stallVideo = await StallVideo.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!stallVideo) {
            return res.status(404).json({ message: 'Stall video entry not found' });
        }
        res.json(stallVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteStallVideo = async (req, res) => {
    try {
        const stallVideo = await StallVideo.findByIdAndDelete(req.params.id);
        if (!stallVideo) {
            return res.status(404).json({ message: 'Stall video entry not found' });
        }
        res.json({ message: 'Stall video entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
