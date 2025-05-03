const express = require('express');
const router = express.Router();
const donorController = require('../controllers/donorController');

router.post('/', donorController.createDonor);

router.get('/', donorController.getAllDonors);

router.put('/:id', donorController.updateDonor);

router.delete('/:id', donorController.deleteDonor);

module.exports = router;