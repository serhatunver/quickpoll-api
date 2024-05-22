import Poll from '../models/Poll.js';

const CreatePoll = async ({ question, options }) => {
  try {
    const savedPoll = await Poll.create({ question, options });
    return savedPoll;
  } catch (err) {
    throw new Error(err.message);
  }
};

const GetPoll = async (id) => {
  try {
    const poll = await Poll.findById(id);
    return poll;
  } catch (err) {
    throw new Error(err.message);
  }
};

const VotePoll = async ({ pollId, optionId }) => {
  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }
    const selectedOption = poll.options.id(optionId);
    if (!selectedOption) {
      throw new Error('Option not found');
    }
    await Poll.findOneAndUpdate({ _id: pollId, 'options._id': selectedOption._id }, { $inc: { 'options.$.votes': 1 } });
    return await Poll.findById(pollId);
  } catch (err) {
    throw new Error(err.message);
  }
};

export default { CreatePoll, GetPoll, VotePoll };
