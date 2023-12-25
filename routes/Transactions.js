const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// POST /transactions/add
router.post('/add', transactionController.addTransaction);

// GET /transactions/all
router.get('/all', transactionController.getAllTransactions);

router.get('/recommendations', transactionController.getRecommendation);

module.exports = router;
