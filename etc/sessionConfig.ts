import { SessionOptions } from 'express-session';
import crypto from 'crypto';
import JWTPayload from '../types/jwtPayload';
import getCookieConfig from './cookieConfig';

declare module 'express-session' {
    interface SessionData {
        accessToken?: JWTPayload;
        csrfToken?: string
    }
}

const sessionConfig = (): SessionOptions => ({
    genid: () => crypto.randomUUID(),
    secret: process.env.SESSION_SECRET_KEY!,
    name: 'session',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 14 * 24 * 60 * 60 * 1000, ...getCookieConfig() }, // expired after two weeks (login again).

});

export default sessionConfig;
