// controllers/mediaController.js
const Media = require('../models/Media');
const mediaSchema = require('../validators/mediaValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createMedia = async (req, res) => {
    try {
        const validatedData = schemaValidator(mediaSchema, req.body);
        const media = await Media.create(validatedData);
        res.status(201).json(media);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMediaById = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media entry not found' });
        }
        res.json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMedia = async (req, res) => {
    try {
        const validatedData = schemaValidator(mediaSchema, req.body);
        const media = await Media.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!media) {
            return res.status(404).json({ message: 'Media entry not found' });
        }
        res.json(media);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMedia = async (req, res) => {
    try {
        const media = await Media.findByIdAndDelete(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media entry not found' });
        }
        res.json({ message: 'Media entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
