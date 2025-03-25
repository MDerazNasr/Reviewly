import express from 'express';
import { processReviewGeneration } from '../api/reviews.js';

const router = express.Router();

// POST /api/reviews/generate - Generate a new review
router.post('/generate', async (req, res) => {
  const result = await processReviewGeneration(req.body);
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

export default router; 