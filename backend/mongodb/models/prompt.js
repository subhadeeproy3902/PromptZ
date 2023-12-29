import mongoose from 'mongoose';

const Prompt = new mongoose.Schema({
  userUid: String,
  username: String,
  useremail: String,
  prompt: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  userpic: String,
});


const PromptSchema = mongoose.model('Prompt', Prompt);

export default PromptSchema;
