import { RequestHandler } from 'express';
import signJWT from '../utils/jwtUtils/signJWT';
import getCookieConfig from '../etc/cookieConfig';

const tokenCreator: RequestHandler = (req, res) => {
    const { jwtPayload } = res.locals;
    req.session.accessToken = jwtPayload;
    const token = signJWT(jwtPayload);
    res.cookie('token', token, getCookieConfig());
    res.redirect('/home');
};

export default tokenCreator;
