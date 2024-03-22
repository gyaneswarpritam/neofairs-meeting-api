// controllers/auditoriumController.js
const Auditorium = require('../models/Auditorium');
const activitySchema = require('../validators/auditoriumValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createAuditorium = async (req, res) => {
    try {
        const validatedData = schemaValidator(auditoriumSchema, req.body);
        const auditorium = await Auditorium.create(validatedData);
        res.status(201).json(auditorium);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllAuditorium = async (req, res) => {
    try {
        const auditorium = await Auditorium.find({});
        if (!auditorium) {
            return res.status(404).json({ message: 'Auditorium not found' });
        }
        res.json(auditorium);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAuditoriumById = async (req, res) => {
    try {
        const auditorium = await Auditorium.findById(req.params.id);
        if (!auditorium) {
            return res.status(404).json({ message: 'Auditorium not found' });
        }
        res.json(auditorium);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAuditorium = async (req, res) => {
    try {
        const validatedData = schemaValidator(auditoriumSchema, req.body);
        const auditorium = await Auditorium.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!auditorium) {
            return res.status(404).json({ message: 'Auditorium not found' });
        }
        res.json(auditorium);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAuditorium = async (req, res) => {
    try {
        const auditorium = await Auditorium.findByIdAndDelete(req.params.id);
        if (!auditorium) {
            return res.status(404).json({ message: 'Auditorium not found' });
        }
        res.json({ message: 'Auditorium deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
