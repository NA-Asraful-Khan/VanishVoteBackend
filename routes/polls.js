import express from 'express';
import {
  createPoll,
  getPoll,
  vote,
  addComment,
  addReaction
} from '../controllers/pollController.js';

const router = express.Router();

router.post('/', createPoll);
router.get('/:id', getPoll);
router.post('/:id/vote', vote);
router.post('/:id/comments', addComment);
router.post('/:id/reactions', addReaction);

export default router;