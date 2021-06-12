import mongoose from './connection';
import { IFile } from './file.interface';

export enum DocumentStatus {
  ACTIVE = 1,
  DELETED = 2,
}

export interface IDocument {
  file: IFile;
  thumbnail: IFile;
  status: DocumentStatus;
}

export interface IDocumentModel extends mongoose.Document, IDocument {}
