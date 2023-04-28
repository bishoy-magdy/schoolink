import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import PostDescription from '../../types/postDescription';
import DataBases from '../../databases';

const postsPagination: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const { page } = req.query;
        const pageNumber = parseInt(page as string, 10);
        const posts: PostDescription[] = await DataBases.sqlite.postsPagination(pageNumber) || [];

        res.send({ posts });
    })().catch(next);
};

export default postsPagination;
