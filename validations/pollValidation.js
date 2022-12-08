import { Joi, Segments } from 'celebrate';

export default {
  createPoll: {
    [Segments.BODY]: Joi.object({
      question: Joi.string().required().min(6).max(120),
      options: Joi.array().items(
        Joi.object({
          value: Joi.string().min(2).max(24).required()
        })
      )
    })
  },
  getPoll: {
    [Segments.PARAMS]: Joi.object({
      pollId: Joi.string().length(24).required()
    })
  },
  votePoll: {
    [Segments.PARAMS]: Joi.object({
      pollId: Joi.string().length(24).required()
    }),
    [Segments.BODY]: Joi.object({
      optionId: Joi.string().length(8).required()
    })
  }
};
