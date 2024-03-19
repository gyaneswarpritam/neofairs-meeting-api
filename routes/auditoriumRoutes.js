// routes/auditoriumRoutes.js
const express = require('express');
const router = express.Router();
const auditoriumController = require('../controllers/auditoriumController');

router.post('/', auditoriumController.createAuditorium);
router.get('/:id', auditoriumController.getAuditoriumById);
router.put('/:id', auditoriumController.updateAuditorium);
router.delete('/:id', auditoriumController.deleteAuditorium);

module.exports = router;
