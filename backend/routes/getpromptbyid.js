import express from 'express';
import * as dotenv from 'dotenv';
import Prompt from '../mongodb/models/prompt.js';

dotenv.config();

const router = express.Router();


router.get('/:id', async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    res.status(200).json({
      prompt,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Prompt retrieval failed!',
    });
  }
});

export default router;