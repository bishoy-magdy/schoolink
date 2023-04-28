import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import crypto from 'crypto';
import DataBases from '../../../databases';
import Post from '../../../types/post';

const createPost: RequestHandler = async (_req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const {
            title, content, poastedAt, jwtPayload,
        } = res.locals;
        const { userId } = jwtPayload;

        const postId = crypto.randomUUID();
        const post: Post = {
            id: postId,
            userId,
            title,
            poastedAt,
            url: postId,
            content,
        };

        await DataBases.sqlite.createPost(post);
        return res.redirect('/home');
    })().catch(next);
};

export default createPost;
