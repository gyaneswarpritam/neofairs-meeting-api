// routes/briefcaseRoutes.js
const express = require('express');
const router = express.Router();
const briefcaseController = require('../controllers/briefcaseController');

// Create a new briefcase
router.post('/', briefcaseController.createBriefcase);

// Get briefcase by ID
router.get('/:id', briefcaseController.getBriefcaseById);

// Update briefcase by ID
router.put('/:id', briefcaseController.updateBriefcase);

// Delete briefcase by ID
router.delete('/:id', briefcaseController.deleteBriefcase);

module.exports = router;
