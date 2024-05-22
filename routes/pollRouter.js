import express from 'express';
import { celebrate } from 'celebrate';
import pollValidation from '../validations/pollValidation.js';
import pollController from '../controllers/pollController.js';
import rateLimiter from '../middlewares/rateLimiter.js';

const router = express.Router();

router.get(
  '/:pollId',
  rateLimiter(60, 20, 'Too many requests, please try again later'),
  celebrate(pollValidation.getPoll),
  pollController.getPoll,
);

router.post(
  '/',
  rateLimiter(60, 2, "You've reached the maximum number of polls"),
  celebrate(pollValidation.createPoll),
  pollController.createPoll,
);

router.post(
  '/:pollId/vote',
  rateLimiter(60, 2, 'Too many requests, please try again later'),
  celebrate(pollValidation.votePoll),
  pollController.votePoll,
);

export default router;
