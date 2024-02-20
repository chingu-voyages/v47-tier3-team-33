const express = require('express');
const { getCategories, getCategoryById } = require('../controllers/Category');

const router = express.Router();

router.get('/', getCategories);
router.get('/:id', getCategoryById);

export default router;
