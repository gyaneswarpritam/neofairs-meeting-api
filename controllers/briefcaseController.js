// controllers/briefcaseController.js
const Briefcase = require('../models/Briefcase');
const briefcaseSchema = require('../validators/briefcaseValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createBriefcase = async (req, res) => {
    try {
        const validatedData = schemaValidator(briefcaseSchema, req.body);
        const briefcase = await Briefcase.create(validatedData);
        res.status(201).json(briefcase);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getBriefcaseById = async (req, res) => {
    try {
        const briefcase = await Briefcase.findById(req.params.id);
        if (!briefcase) {
            return res.status(404).json({ message: 'Briefcase not found' });
        }
        res.json(briefcase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBriefcase = async (req, res) => {
    try {
        const validatedData = schemaValidator(briefcaseSchema, req.body);
        const briefcase = await Briefcase.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!briefcase) {
            return res.status(404).json({ message: 'Briefcase not found' });
        }
        res.json(briefcase);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBriefcase = async (req, res) => {
    try {
        const briefcase = await Briefcase.findByIdAndDelete(req.params.id);
        if (!briefcase) {
            return res.status(404).json({ message: 'Briefcase not found' });
        }
        res.json({ message: 'Briefcase deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
