import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';

const loginSanitizer: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const { login, password, csrfToken } = req.body;
        res.locals = {
            login,
            password,
            csrfToken,
        };

        next();
    })().catch(next);
};

export default loginSanitizer;
