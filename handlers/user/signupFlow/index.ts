import { RequestHandler } from 'express';
import signupSanitizer from './signupSanitizer';
import createUser from './createUser';
import { csrfToken } from '../../../middlewares/csrf';
import tokenCreator from '../../../middlewares/tokenCreator';

const signupFlow: RequestHandler[] = [
    signupSanitizer,
    csrfToken,
    createUser,
    tokenCreator,
];

export default signupFlow;
