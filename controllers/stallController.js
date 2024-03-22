// controllers/stallController.js
const Stall = require('../models/Stall');
const stallSchema = require('../validators/stallValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createStall = async (req, res) => {
    try {
        const validatedData = schemaValidator(stallSchema, req.body);
        if (validatedData.success) {
            const stall = await Stall.create(validatedData.data);
            const successObj = successResponse('Stall Created', stall)
            res.status(successObj.status).send(successObj);
        } else {
            res.status(401).json({ message: validation.errors });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getStallById = async (req, res) => {
    try {
        const stall = await Stall.findById(req.params.id);
        if (!stall) {
            return res.status(404).json({ message: 'Stall entry not found' });
        }
        const successObj = successResponse('Stall List', stall)
        res.status(successObj.status).send(successObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStall = async (req, res) => {
    try {
        const validatedData = schemaValidator(stallSchema, req.body);
        if (validatedData.success) {
            const stall = await Stall.findByIdAndUpdate(req.params.id, validatedData.data, { new: true });
            if (!stall) {
                return res.status(404).json({ message: 'Stall entry not found' });
            }
            const successObj = successResponse('Stall updated', stall)
            res.status(successObj.status).send(successObj);
        } else {
            res.status(401).json({ message: validation.errors });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteStall = async (req, res) => {
    try {
        const stall = await Stall.findByIdAndDelete(req.params.id);
        if (!stall) {
            return res.status(404).json({ message: 'Stall entry not found' });
        }
        res.json({ message: 'Stall entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
