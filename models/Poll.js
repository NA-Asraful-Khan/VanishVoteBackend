import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [optionSchema],
  expiresAt: { type: Date, required: true },
  hideResults: { type: Boolean, default: false },
  isPrivate: { type: Boolean, default: true },
  comments: [commentSchema],
  reactions: {
    likes: { type: Number, default: 0 },
    trending: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now }
});

// Add index for automatic deletion after expiration
pollSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Poll', pollSchema);