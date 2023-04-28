import { RequestHandler } from 'express';
import OAuth2 from '../../../etc/googleOAuth2.0';

const oAuthStartPoint: RequestHandler = async (req, res, next) => {
    (async () => {
        const oauth2 = OAuth2.google;
        const { code } = req.query;
        const { tokens } = await oauth2.getToken(code as string);

        oauth2.setCredentials(tokens);
        const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`;
        const { data }: any = await oauth2.request({ url });

        const {
            email, family_name: firstName, family_name: lastName,
        } = data;

        const tokenString = JSON.stringify(tokens);

        Object.assign(res.locals, {
            firstName,
            lastName,
            username: email,
            email,
            authValue: tokenString,
            authType: 'token',
        });

        return next();
    })().catch(next);
};

export default oAuthStartPoint;
