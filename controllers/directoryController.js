// controllers/directoryController.js
const Directory = require('../models/Directory');
const directorySchema = require('../validators/directoryValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createDirectory = async (req, res) => {
    try {
        const validatedData = schemaValidator(directorySchema, req.body);
        const directory = await Directory.create(validatedData);
        res.status(201).json(directory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllDirectory = async (req, res) => {
    try {
        const directory = await Directory.find({});
        if (!directory) {
            return res.status(404).json({ message: 'Directory not found' });
        }
        res.json(directory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDirectoryById = async (req, res) => {
    try {
        const directory = await Directory.findById(req.params.id);
        if (!directory) {
            return res.status(404).json({ message: 'Directory entry not found' });
        }
        res.json(directory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDirectory = async (req, res) => {
    try {
        const validatedData = schemaValidator(directorySchema, req.body);
        const directory = await Directory.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!directory) {
            return res.status(404).json({ message: 'Directory entry not found' });
        }
        res.json(directory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteDirectory = async (req, res) => {
    try {
        const directory = await Directory.findByIdAndDelete(req.params.id);
        if (!directory) {
            return res.status(404).json({ message: 'Directory entry not found' });
        }
        res.json({ message: 'Directory entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
