import rateLimit from 'express-rate-limit';
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
export const cookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
};
