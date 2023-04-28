import { RequestHandler } from 'express';
import postSanitizer from './postSanitizer';
import { AuthLevel } from '../../../etc/constants';
import authenticator from '../../../middlewares/authenticator';
import { csrfVerifier } from '../../../middlewares/csrf';
import createPost from './createPost';
import isAdmin from '../../../middlewares/isAdmin';

const { STRICT } = AuthLevel;

const postCreationFlow: RequestHandler[] = [authenticator(STRICT), isAdmin, postSanitizer, csrfVerifier, createPost];

export default postCreationFlow;
