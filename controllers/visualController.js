// controllers/visualController.js
const Visual = require('../models/Visual');
const visualSchema = require('../validators/visualValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createVisual = async (req, res) => {
    try {
        const validatedData = schemaValidator(visualSchema, req.body);
        const visual = await Visual.create(validatedData);
        res.status(201).json(visual);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getVisualById = async (req, res) => {
    try {
        const visual = await Visual.findById(req.params.id);
        if (!visual) {
            return res.status(404).json({ message: 'Visual entry not found' });
        }
        res.json(visual);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateVisual = async (req, res) => {
    try {
        const validatedData = schemaValidator(visualSchema, req.body);
        const visual = await Visual.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!visual) {
            return res.status(404).json({ message: 'Visual entry not found' });
        }
        res.json(visual);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteVisual = async (req, res) => {
    try {
        const visual = await Visual.findByIdAndDelete(req.params.id);
        if (!visual) {
            return res.status(404).json({ message: 'Visual entry not found' });
        }
        res.json({ message: 'Visual entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
