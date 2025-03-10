import Poll from '../models/Poll.js';
import { nanoid } from 'nanoid';

export const createPoll = async (req, res) => {
  try {
    const { question, options, expiresIn, hideResults, isPrivate } = req.body;
    
    const expiresAt = new Date(Date.now() + expiresIn * 60 * 60 * 1000); // Convert hours to milliseconds
    
    const poll = new Poll({
      question,
      options: options.map(opt => ({ text: opt })),
      expiresAt,
      hideResults,
      isPrivate
    });

    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const vote = async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const poll = await Poll.findById(req.params.id);
    
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    
    if (new Date() > poll.expiresAt) {
      return res.status(400).json({ message: 'Poll has expired' });
    }
    
    poll.options[optionIndex].votes += 1;
    await poll.save();
    
    res.json(poll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const poll = await Poll.findById(req.params.id);
    
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    
    poll.comments.push({ text });
    await poll.save();
    
    res.json(poll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const addReaction = async (req, res) => {
  try {
    const { type } = req.body; // 'like' or 'trending'
    const poll = await Poll.findById(req.params.id);
    
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    
    poll.reactions[type] += 1;
    await poll.save();
    
    res.json(poll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};