import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import DataBases from '../databases';

const isAdmin: RequestHandler = async (_req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const { userId } = res.locals.jwtPayload;
        const userStatus = await DataBases.sqlite.isAdmin(userId as string);

        if (!userStatus.isAdmin) {
            res.send({ message: 'Should Be Admin To Create a Post' });
        } else {
            next();
        }
    })().catch(next);
};

export default isAdmin;
