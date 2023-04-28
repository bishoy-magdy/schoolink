import {
    RequestHandler, Request, Response, NextFunction,
} from 'express';
import escape from 'validator/lib/escape';
import isEmpty from 'validator/lib/isEmpty';

const postSanitizer: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const {
        title, content, csrfToken,
    } = req.body;

    const isValid = !isEmpty(title, { ignore_whitespace: true }) && !isEmpty(content, { ignore_whitespace: true });

    if (!isValid) {
        return res.send('invalid post content');
    }

    Object.assign(
        res.locals,
        {
            title: escape(title),
            content: escape(content),
            poastedAt: Date.now(),
            csrfToken,
        },
    );

    return next();
};

export default postSanitizer;
