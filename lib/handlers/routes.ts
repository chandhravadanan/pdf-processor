import express from 'express';
import * as DocumentController from '../controller/document';
import * as FilesController from '../controller/file';
import logger from '../util/logger';

const router = express.Router();

router.post('/document/add', DocumentController.addDocument);

router.get('/documents', DocumentController.getDocuments);

router.get('/file/:fileId', FilesController.getFile);

router.post('/test/webhook', (req, res) => {
  logger.info('[webhook]', req.body)
  res.json({ isSuccess: true });
});

export default router;