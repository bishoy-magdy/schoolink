import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import bcrypt from 'bcrypt';
import validator from 'validator';
import DataBases from '../../../databases';

const { isEmail, isAlphanumeric } = validator;

const signupSanitizer: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const {
            firstName, lastName, username, email, password, csrfToken,
        } = req.body;

        const userFields = firstName && lastName && username && email && password && isEmail(email) && isAlphanumeric(username);

        if (!userFields) {
            res.status(401)
                .send('invalid field');
        }

        const searchByName = DataBases.sqlite.getUserByUsername(username);
        const searchByEmail = DataBases.sqlite.getUserByEmail(email);
        const [search1, search2] = await Promise.all([searchByEmail, searchByName]);
        const userExist = search1 || search2;

        if (userExist) {
            return res.status(403)
                .send('username or email is aleady exist');
        }

        const authValue = await bcrypt.hash(password, 10);

        Object.assign(res.locals, {
            firstName,
            lastName,
            username,
            email,
            authValue,
            authType: 'password',
            csrfToken,
        });
        return next();
    })().catch(next);
};

export default signupSanitizer;
