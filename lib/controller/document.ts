import { Request, Response, NextFunction } from 'express';
import * as DocumentService from '../services/document';
import { InputError } from '../handlers/errors';
import logger from '../util/logger';

export const addDocument = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url, webhook } = req.body;
    if (!url) {
      throw new InputError('Invalid url');
    }
    await DocumentService.addDocument(url, webhook);
    res.json({ isSuccess: true });
    logger.info('[addDocument] response sent');
  } catch (err) {
    next(err)
  }
};

export const getDocuments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const documents = await DocumentService.getDocuments();
    res.json({ isSuccess: true, documents });
  } catch (err) {
    next(err)
  }
};