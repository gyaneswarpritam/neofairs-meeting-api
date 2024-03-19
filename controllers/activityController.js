// controllers/activityController.js
const Activity = require('../models/Activity');
const activitySchema = require('../validators/activityValidator');
const schemaValidator = require('../validators/schemaValidator');

exports.createActivity = async (req, res) => {
    try {
        const validatedData = schemaValidator(activitySchema, req.body);
        console.log(validatedData, '@@@@@@@@@@@')
        if (validatedData.success) {
            const activity = await Activity.create(validatedData.data);
            res.status(201).json(activity);

            // Respond with success message
            res.status(201).json({ message: 'Visitor registered successfully' });
        } else {
            res.status(401).json({ message: validatedData.errors });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllActivities = async (req, res) => {
    try {
        const activity = await Activity.find({});
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getActivityById = async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.json(activity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateActivity = async (req, res) => {
    try {
        const validatedData = schemaValidator(activitySchema, req.body);
        if (validatedData.success) {
            const activity = await Activity.findByIdAndUpdate(req.params.id, validatedData.data, { new: true });
            if (!activity) {
                return res.status(404).json({ message: 'Activity not found' });
            }

            // Respond with success message
            res.status(200).json({ data: activity, message: 'Activity updated successfully' });
        } else {
            res.status(401).json({ message: validatedData.errors });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteActivity = async (req, res) => {
    try {
        const activity = await Activity.findByIdAndDelete(req.params.id);
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        res.json({ message: 'Activity deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
