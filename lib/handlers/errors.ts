import { NextFunction, Request, Response } from 'express';
import logger from '../util/logger';

class CustomError extends Error {
  httpCode: number;
  constructor(message: string, httpCode: number){
    super(message);
    this.httpCode = httpCode;
  }
}

// tslint:disable-next-line:max-classes-per-file
export class InputError extends CustomError {
  constructor(message: string){
    super(message, 400);
  }
}

// tslint:disable-next-line:max-classes-per-file
export class ResourceNotExist extends CustomError {
  constructor(message: string){
    super(message, 404);
  }
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next?: NextFunction,
): void => {
  const resCode = err?.httpCode || 500;
  const json = { isSuccess: false, message: err.message };

  if (resCode === 500) {
    logger.error(`[${req.url}] ${err.message}`);
  } else {
    logger.info(`[${req.url}] ${err.message}`);
  }
  res.status(resCode).json(json);
};