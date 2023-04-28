import { Router } from 'express';
import loginFlow from '../handlers/user/loginFlow';
import logoutFlow from '../handlers/user/logoutFlow';
import signupFlow from '../handlers/user/signupFlow';
import getOAuth from '../handlers/auth/gOAuthURL';
import oauth2Flow from '../handlers/user/oauth2.0Flow';

const auth = Router();

auth.post('/signup', ...signupFlow)
    .post('/login', ...loginFlow)
    .get('/logout', ...logoutFlow)
    .get('/v1/g/oauth2/code', ...oauth2Flow)
    .get('/v1/g/oauth2url', getOAuth);

export default auth;
