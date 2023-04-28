import multer from 'multer';
import { join } from 'path';
import crypto from 'crypto';

const attachmentLocation = join(__dirname, '..', 'databases', 'attachments');

const storage = multer.diskStorage({
    destination(_req, _file, cb) {
        cb(null, attachmentLocation);
    },

    filename(_req, file, cb) {
        const uniqueSuffix = crypto.randomUUID();
        cb(null, `${file.fieldname}-${uniqueSuffix}`);
    },
});

export default multer({ storage });
