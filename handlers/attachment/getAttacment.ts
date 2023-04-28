import { RequestHandler } from 'express';
import { join } from 'path';
import fs from 'fs';

const getAttachment: RequestHandler = async (req, res) => {
    const { fileName } = req.query;
    const attachmentLocation = join(__dirname, '..', '..', 'databases', 'attachments', fileName as string);
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const stream = fs.createReadStream(attachmentLocation);
    stream.pipe(res);
};

export default getAttachment;
