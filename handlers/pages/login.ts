import { RequestHandler, Request, Response } from 'express';

const login: RequestHandler = (_req: Request, res: Response) => {
    const { csrfToken } = res.locals;
    res.render('pages/login', { csrfToken });
};

export default login;
