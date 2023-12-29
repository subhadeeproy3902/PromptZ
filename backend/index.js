import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import createPrompt from './routes/createprompt.js';
import getAllPrompts from './routes/getallprompts.js';
import updatePrompt from './routes/updateprompt.js';
import deletePrompt from './routes/deleteprompt.js';
import getUserPrompts from './routes/getuserprompts.js';
import getPromptById from './routes/getpromptbyid.js';


dotenv.config();

const app = express();
const corsOrigin = process.env.NODE_ENV === 'production'
    ? "https://promptz.vercel.app"
    : "http://localhost:5173";

app.use(cors({
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,OPTIONS,DELETE',
    credentials: true,
}));

app.use(express.json({ limit: '50mb' }));

app.use('/api/createprompt', createPrompt);
app.use('/api/getallprompts', getAllPrompts);
app.use('/api/updateprompt', updatePrompt);
app.use('/api/deleteprompt', deletePrompt);
app.use('/api/getuserprompts', getUserPrompts);
app.use('/api/getpromptbyid', getPromptById);



app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Backend running',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();