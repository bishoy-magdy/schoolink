import { RequestHandler } from 'express';
import { AuthLevel } from '../../../etc/constants';
import authenticator from '../../../middlewares/authenticator';
import { csrfVerifier } from '../../../middlewares/csrf';
import commentSanitizer from './commentSanitizer';
import addComment from './addComment';

const { STRICT } = AuthLevel;

const commentAdditionFlow: RequestHandler[] = [authenticator(STRICT), commentSanitizer, csrfVerifier, addComment];

export default commentAdditionFlow;
