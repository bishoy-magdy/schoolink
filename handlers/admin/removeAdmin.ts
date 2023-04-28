import { RequestHandler } from 'express';
import DataBases from '../../databases';

const removeAdmin: RequestHandler = async (req, res, next) => {
    (async () => {
        const { username, csrfToken } = req.query;
        const sessionCSRFToken = req.session.csrfToken;
        delete req.session.csrfToken;

        if (!sessionCSRFToken || sessionCSRFToken !== csrfToken) {
            return res.sendStatus(498);
        }

        const user = await DataBases.sqlite.getUserByUsername(username as string);
        await DataBases.sqlite.removeAdmin(user?.id as string);
        return res.send({ message: 'ok' });
    })().catch(next);
};

export default removeAdmin;
