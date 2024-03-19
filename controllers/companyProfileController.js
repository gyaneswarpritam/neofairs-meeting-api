// controllers/companyProfileController.js
const CompanyProfile = require('../models/companyProfile');
const companyProfileSchema = require('../validators/companyProfileValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createCompanyProfile = async (req, res) => {
    try {
        const validatedData = schemaValidator(companyProfileSchema, req.body);
        const companyProfile = await CompanyProfile.create(validatedData);
        res.status(201).json(companyProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getCompanyProfileById = async (req, res) => {
    try {
        const companyProfile = await CompanyProfile.findById(req.params.id);
        if (!companyProfile) {
            return res.status(404).json({ message: 'Company profile not found' });
        }
        res.json(companyProfile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCompanyProfile = async (req, res) => {
    try {
        const validatedData = schemaValidator(companyProfileSchema, req.body);
        const companyProfile = await CompanyProfile.findByIdAndUpdate(req.params.id, validatedData, { new: true });
        if (!companyProfile) {
            return res.status(404).json({ message: 'Company profile not found' });
        }
        res.json(companyProfile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCompanyProfile = async (req, res) => {
    try {
        const companyProfile = await CompanyProfile.findByIdAndDelete(req.params.id);
        if (!companyProfile) {
            return res.status(404).json({ message: 'Company profile not found' });
        }
        res.json({ message: 'Company profile deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
