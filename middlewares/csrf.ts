import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import crypto from 'crypto';

export const csrfToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const newCSRFToken = `${crypto.randomUUID()}`;
        req.session.csrfToken = newCSRFToken;
        res.locals.csrfToken = newCSRFToken;

        next();
    })().catch(next);
};

export const csrfVerifier: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const { csrfToken: csrfTokenSession } = req.session;
        const { csrfToken: csrfTokenRequest } = res.locals;

        if (!csrfTokenSession || csrfTokenSession !== csrfTokenRequest) {
            throw new Error('invalid csrf token');
        }

        // a CSRF token is active only once.
        delete req.session.csrfToken;
        next();
    })().catch(next);
};
