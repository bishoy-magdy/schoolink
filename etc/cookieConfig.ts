import { CookieOptions } from 'express';

const getCookieConfig = (): CookieOptions => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
});

export default getCookieConfig;
