import rateLimit from 'express-rate-limit';

const rateLimiter = (second, max, message) => {
  return rateLimit({
    windowMs: second * 1000,
    max,
    message
  });
};

export default rateLimiter;
