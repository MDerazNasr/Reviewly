import express from 'express';
import { processCompanyCreation, getCompanies } from '../api/companies.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

// GET /api/companies - Get all companies
router.get('/', async (req, res) => {
  const result = await getCompanies();
  if (result.success) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
});

// POST /api/companies - Create a new company
router.post('/', upload.single('logo'), async (req, res) => {
  const requestData = {
    ...req.body,
    keywords: req.body.keywords ? JSON.parse(req.body.keywords) : [],
    logoFile: req.file
  };

  const result = await processCompanyCreation(requestData);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

export default router; 