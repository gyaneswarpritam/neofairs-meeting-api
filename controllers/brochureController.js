// controllers/brochureController.js
const Brochure = require('../models/Brochure');
const brochureSchema = require('../validators/brochureValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createBrochure = async (req, res) => {
    try {
        const validatedData = schemaValidator(brochureSchema, req.body);
        const brochure = await Brochure.create(validatedData);
        res.status(201).json(brochure);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getBrochureById = async (req, res) => {
    try {
        const brochure = await Brochure.findById(req.params.id);
        if (!brochure) {
            return res.status(404).json({ message: 'Brochure not found' });
        }
        res.json(brochure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBrochure = async (req, res) => {
    try {
        const validatedData = schemaValidator(brochureSchema, req.body);
        const brochure = await Brochure.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!brochure) {
            return res.status(404).json({ message: 'Brochure not found' });
        }
        res.json(brochure);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBrochure = async (req, res) => {
    try {
        const brochure = await Brochure.findByIdAndDelete(req.params.id);
        if (!brochure) {
            return res.status(404).json({ message: 'Brochure not found' });
        }
        res.json({ message: 'Brochure deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
