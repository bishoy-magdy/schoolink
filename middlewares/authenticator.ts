import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import signJWT from '../utils/jwtUtils/signJWT';
import { AuthLevel } from '../etc/constants';
import verifyJWT from '../utils/jwtUtils/verifyJWT';
import getCookieConfig from '../etc/cookieConfig';

const { STRICT } = AuthLevel;

const authenticator = (authLevel: AuthLevel): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        const jwtPayload = verifyJWT(token);
        res.locals.jwtPayload = jwtPayload;
        return next();
    } catch (err) {
        if (err instanceof TokenExpiredError) {
            // eslint-disable-next-line no-console
            console.log('---- the token is expired -------');
            const { accessToken } = req.session;
            if (accessToken) {
                const newJWTToken = signJWT(accessToken);
                res.locals.jwtPayload = accessToken;
                res.cookie('token', newJWTToken, getCookieConfig());

                // eslint-disable-next-line no-console
                console.log('---- the token is renew -------');
                return next();
            }
        }

        if (authLevel === STRICT) {
            return res.redirect('/login');
        }

        return next();
    }
};

export default authenticator;
