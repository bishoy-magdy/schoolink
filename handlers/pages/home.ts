import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import DataBases from '../../databases';

const home: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const { jwtPayload } = res.locals;
        const username = jwtPayload ? jwtPayload.username : undefined;
        const { page } = req.query;
        const { postsNumber } = await DataBases.sqlite.postsNumber();
        const totalPages = Math.ceil((postsNumber || 0) / 10);

        res.render('pages/home', { username, pageNumber: page || 0, totalPages });
    })().catch(next);
};

export default home;
