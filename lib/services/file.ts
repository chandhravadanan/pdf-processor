import mongoose from '../model/connection';
import FileModel from '../model/file';
import { FileStatus, IFileModel } from '../model/file.interface';
import { ResourceNotExist } from '../handlers/errors';

export const getFilePath = async (fileId: string) => {
  const file: IFileModel = await FileModel.findOne({
    _id: mongoose.Types.ObjectId(fileId),
    status: FileStatus.ACTIVE,
  })

  if (!file) {
    throw new ResourceNotExist('File not exist.');
  }

  return file.path;
}