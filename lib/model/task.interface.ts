import mongoose from './connection';

export enum TaskStatus {
  SCHEDULED = 1,
  IN_PROGRESS = 2,
  SUCCESS = 3,
  FAILED = 4,
}

export interface ITask {
  url: string;
  webhook: string;
  status: TaskStatus;
}

export interface ITaskModel extends mongoose.Document, ITask {}
