import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { InputError } from '../handlers/errors';
import { getFilePath } from '../services/file';

export const getFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fileId } = req.params;
    if (!isValidObjectId(fileId)) {
      throw new InputError('Invalid FileId');
    }
    const filePath = await getFilePath(fileId);
    res.sendFile(filePath);
  } catch (err) {
    next(err)
  }
};