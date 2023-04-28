import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import bcrypt from 'bcrypt';
import { JwtPayload } from 'jsonwebtoken';
import DataBases from '../../../databases';

const loginVerifier: RequestHandler = async (_req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const { login, password } = res.locals;

        const searchByName = DataBases.sqlite.getUserByUsername(login);
        const searchByEmail = DataBases.sqlite.getUserByEmail(login);

        const [search1, search2] = await Promise.all([searchByEmail, searchByName]);
        const user = search1 || search2;

        const varify = await bcrypt.compare(password, user?.authValue || '');

        if (!user || !varify) {
            return res.status(403).send('User not exitst or password wrong:(');
        }

        const jwtPayload: JwtPayload = {
            userId: user.id,
            username: user.username,
        };
        res.locals.jwtPayload = jwtPayload;

        return next();
    })().catch(next);
};

export default loginVerifier;
