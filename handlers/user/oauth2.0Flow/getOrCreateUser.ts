import { RequestHandler } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import DataBases from '../../../databases';
import User from '../../../types/user';

const getOrCreateUser: RequestHandler = async (req, res, next) => {
    (async () => {
        const {
            firstName,
            lastName,
            username,
            email,
            authValue,
            authType,
        } = res.locals;

        const user = await DataBases.sqlite.getUserByEmail(email);

        if (user) {
            const jwtPayload: JwtPayload = { userId: user.id, username: user.username };
            res.locals.jwtPayload = jwtPayload;
            return next();
        }

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
        return next();
    })().catch(next);
};

export default getOrCreateUser;
