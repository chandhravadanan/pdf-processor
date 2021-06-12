import mongoose from './connection';
import { ITaskModel, TaskStatus } from './task.interface';

const taskSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    webhook: {
      type: String,
      required: false,
    },
    status: {
      default: TaskStatus.SCHEDULED,
      type: TaskStatus,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const TaskModel =
  mongoose.models.tasks ||
  mongoose.model<ITaskModel>(`tasks`, taskSchema);

export default TaskModel;
