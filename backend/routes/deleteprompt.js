import express from 'express';
import * as dotenv from 'dotenv';
import Prompt from '../mongodb/models/prompt.js';

dotenv.config();

const router = express.Router();

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Prompt.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Prompt deleted!',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Prompt deletion failed!',
    });
  }
});

export default router;
