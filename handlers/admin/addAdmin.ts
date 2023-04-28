import { RequestHandler } from 'express';
import DataBases from '../../databases';

const addAdmin: RequestHandler = (req, res, next) => {
    (async () => {
        const { username, csrfToken } = req.body;
        const sessionCSRFToken = req.session.csrfToken;
        delete req.session.csrfToken;

        if (!sessionCSRFToken || sessionCSRFToken !== csrfToken) {
            return res.sendStatus(498);
        }

        const user = await DataBases.sqlite.getUserByUsername(username);
        await DataBases.sqlite.addAdmin(user?.id as string);
        return res.send({ message: 'ok' });
    })().catch(next);
};

export default addAdmin;
