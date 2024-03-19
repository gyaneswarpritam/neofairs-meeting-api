// controllers/faqController.js
const Faq = require('../models/Faq');
const faqSchema = require('../validators/faqValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createFaq = async (req, res) => {
    try {
        const validatedData = schemaValidator(faqSchema, req.body);
        const faq = await Faq.create(validatedData);
        res.status(201).json(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getFaqById = async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ entry not found' });
        }
        res.json(faq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateFaq = async (req, res) => {
    try {
        const validatedData = schemaValidator(faqSchema, req.body);
        const faq = await Faq.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!faq) {
            return res.status(404).json({ message: 'FAQ entry not found' });
        }
        res.json(faq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFaq = async (req, res) => {
    try {
        const faq = await Faq.findByIdAndDelete(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ entry not found' });
        }
        res.json({ message: 'FAQ entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
