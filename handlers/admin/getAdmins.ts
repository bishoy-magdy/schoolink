import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import crypto from 'crypto';
import DataBases from '../../databases';

const getAdmins: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const { username } = res.locals.jwtPayload;
        const csrfToken = crypto.randomUUID();
        req.session.csrfToken = csrfToken;
        const admins = await DataBases.sqlite.getAdmins();

        res.render('pages/admins', { username, admins, csrfToken });
    })().catch(next);
};

export default getAdmins;
