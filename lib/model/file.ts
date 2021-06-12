import mongoose from './connection';
import { FileStatus, IFileModel } from './file.interface';

const fileSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      default: FileStatus.ACTIVE,
      type: FileStatus,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const FileModel =
  mongoose.models.files ||
  mongoose.model<IFileModel>(`files`, fileSchema);

export default FileModel;
