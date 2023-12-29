import express from 'express';
import * as dotenv from 'dotenv';
import Prompt from '../mongodb/models/prompt.js';

dotenv.config();

const router = express.Router();

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { prompt, tag } = req.body;
  try {
    await Prompt.findByIdAndUpdate(id, {
      prompt,
      tag,
    });
    res.status(200).json({
      message: 'Prompt updated!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Prompt update failed!',
    });
  }
});

export default router;