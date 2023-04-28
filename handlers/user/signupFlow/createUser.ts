import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import { randomUUID } from 'crypto';
import DataBases from '../../../databases';
import User from '../../../types/user';

const createUser: RequestHandler = async (_req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const {
            firstName, lastName, username, email, authType, authValue,
        } = res.locals;

        const newUser: User = {
            id: randomUUID(),
            firstName,
            lastName,
            username,
            email,
            authValue,
            authType,
        };

        await DataBases.sqlite.createUser(newUser);
        res.locals.jwtPayload = { userId: newUser.id, username };

        next();
    })().catch(next);
};

export default createUser;
