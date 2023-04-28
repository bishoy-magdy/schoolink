// google oauth url
import { RequestHandler } from 'express';
import OAuth2 from '../../etc/googleOAuth2.0';

const getOAuth: RequestHandler = (_req, res) => {
    const url = OAuth2.url();
    res.redirect(url);
};

export default getOAuth;
