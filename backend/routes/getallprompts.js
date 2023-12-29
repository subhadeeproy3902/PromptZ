import express from 'express';
import * as dotenv from 'dotenv';
import Prompt from '../mongodb/models/prompt.js';

dotenv.config();

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const prompts = await Prompt.find({});
    res.status(200).json({
      prompts,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Prompt retrieval failed!',
    });
  }
});

export default router;