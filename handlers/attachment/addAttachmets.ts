import { RequestHandler } from 'express';

const addAttachments: RequestHandler = async (req, res) => {
    const file = req.file as Express.Multer.File || undefined;
    if (!file) { res.sendStatus(404); }

    const { mimetype, filename } = file;
    const fileInfo = { mimetype, filePath: `/get/attachment?fileName=${filename}` };
    res.send({ fileInfo });
};

export default addAttachments;
