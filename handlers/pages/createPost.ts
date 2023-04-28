import { RequestHandler, Request, Response } from 'express';

const createPost: RequestHandler = (_req: Request, res: Response) => {
    const { csrfToken, jwtPayload } = res.locals;
    const { username } = jwtPayload;
    res.render('pages/createPost', { username, csrfToken });
};

export default createPost;
