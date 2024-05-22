import pollService from '../services/pollService.js';
import status from 'http-status';
import { socketServer } from '../socket.js';

const createPoll = async (req, res) => {
  const { question, options } = req.body;
  try {
    const savedPoll = await pollService.CreatePoll({ question, options });
    res.status(status.CREATED).json(savedPoll);
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

const getPoll = async (req, res) => {
  const { pollId } = req.params;
  try {
    const poll = await pollService.GetPoll(pollId);
    res.status(status.OK).json(poll);
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

const votePoll = async (req, res) => {
  const { pollId } = req.params;
  const { optionId } = req.body;
  try {
    const poll = await pollService.VotePoll({ pollId, optionId });
    socketServer.emit('result', poll);
    res.status(status.OK).json(poll);
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

export default { createPoll, getPoll, votePoll };
