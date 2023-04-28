import { Router } from 'express';
import addAdmin from '../handlers/admin/addAdmin';
import removeAdmin from '../handlers/admin/removeAdmin';
import getAdmins from '../handlers/admin/getAdmins';
import authenticator from '../middlewares/authenticator';
import { AuthLevel } from '../etc/constants';
import isAdmin from '../middlewares/isAdmin';

const admin = Router();
const { STRICT } = AuthLevel;

admin.get('/', authenticator(STRICT), isAdmin, getAdmins)
    .post('/', authenticator(STRICT), isAdmin, addAdmin)
    .delete('/', authenticator(STRICT), isAdmin, removeAdmin);

export default admin;
