import { Router } from 'express';
import home from '../handlers/pages/home';
import createPost from '../handlers/pages/createPost';
import signup from '../handlers/pages/signup';
import login from '../handlers/pages/login';
import postsPagination from '../handlers/pagination/post';
import { csrfToken } from '../middlewares/csrf';
import { AuthLevel } from '../etc/constants';
import authenticator from '../middlewares/authenticator';

const global = Router();
const { STRICT, LENIENT } = AuthLevel;

// html render

global.get('/createPost', authenticator(STRICT), csrfToken, createPost)
    .get('/home', authenticator(LENIENT), home)
    .get('/posts', postsPagination)
    .get('/signup', csrfToken, signup)
    .get('/login', csrfToken, login);

export default global;
