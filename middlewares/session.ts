import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import signJWT from '../utils/jwtUtils/signJWT';
import { AuthLevel } from '../etc/constants';
import getCookieConfig from '../etc/cookieConfig';

const { STRICT } = AuthLevel;

const sessionVerifier = (authLevel: AuthLevel) : RequestHandler => (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const { accessToken } = req.session;

        if (accessToken) {
            const token = signJWT(accessToken);
            res.locals.jwtPayload = accessToken;
            res.cookie('token', token, getCookieConfig());

            return next();
        }

        if (authLevel === STRICT) {
            return res.redirect('/login');
        }

        return next();
    })().catch(next);
};

export default sessionVerifier;
