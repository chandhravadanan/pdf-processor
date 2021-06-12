import mongoose from './connection';

export enum FileStatus {
  ACTIVE = 1,
  DELETED = 2,
}

export interface IFile {
  path: string;
  type: string;
  status: FileStatus;
}

export interface IFileModel extends mongoose.Document, IFile {}
