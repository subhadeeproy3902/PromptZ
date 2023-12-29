import express from 'express';
import * as dotenv from 'dotenv';
import Prompt from '../mongodb/models/prompt.js';

dotenv.config();

const router = express.Router();


router.post('/', async (req, res) => {
  const { prompt, userUid, username, tag, useremail, userpic } = req.body;
  try {
    const newPrompt = new Prompt({
      prompt,
      userUid,
      username,
      tag,
      useremail,
      userpic,
    });
    await newPrompt.save();
    res.status(200).json({
      message: 'Prompt created!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Prompt creation failed!',
    });
  }
});

export default router;