import { RequestHandler } from 'express';
import loginSanitizer from './loginSanitizer';
import loginVerifier from './loginVerifier';
import { csrfVerifier } from '../../../middlewares/csrf';
import tokenCreator from '../../../middlewares/tokenCreator';

const loginFlow: RequestHandler[] = [loginSanitizer, csrfVerifier, loginVerifier, tokenCreator];

export default loginFlow;
