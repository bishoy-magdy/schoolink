import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import crypto from 'crypto';
import DataBases from '../../../databases';
import Comment from '../../../types/comment';

const addComment: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        const {
            postId,
            content,
            commentedAt,
            jwtPayload,
        } = res.locals;

        const { userId } = jwtPayload;
        const id = crypto.randomUUID();

        const commentProp: Comment = {
            id,
            userId,
            postId,
            content,
            commentedAt,
        };

        await DataBases.sqlite.addComment(commentProp);
        res.redirect(`/get/post?id=${postId}`);
    })().catch(next);
};

export default addComment;
