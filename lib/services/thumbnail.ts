import gm from 'gm';
import FileModel from '../model/file';
import { IFileModel } from '../model/file.interface';
import { FILE_TYPE } from '../util/constants';
import { getFullPath } from '../util/helper';
import logger from '../util/logger';

export default class ThumbnailGenerator {
  file: IFileModel;

  constructor(file: IFileModel) {
    this.file = file;
  }

  async generate(): Promise<IFileModel> {
    if (!this.file) {
      throw new Error('Invalid File');
    }

    const filePath = this.file.path;
    const thumbFile: IFileModel = new FileModel();
    const thumbFilePath = getFullPath(`${thumbFile.id}.${FILE_TYPE.JPEG}`);

    return new Promise((resolve, reject) => {
      gm(`${filePath}[0]`) // [0] => first page of the pdf
      .setFormat(FILE_TYPE.JPEG)
      .resize(200) // Resize to fixed 200px width, maintaining aspect ratio
      .quality(75) // Quality from 0 to 100
      .write(thumbFilePath, async (error) => {
        if (error) {
          logger.error(`[generateThumbnail] unable to generate thumbnail`, error);
          return reject(error);
        }

        try {
          logger.info('[generateThumbnail] Finished saving thumbnail JPG');
          thumbFile.path = thumbFilePath;
          thumbFile.type = FILE_TYPE.JPEG;

          const thumbnail = await thumbFile.save();
          resolve(thumbnail);
        } catch (e) {
          logger.error(`[generateThumbnail] unable to store thumbnail info`, e);
          reject(e);
        }
      });
    });
  }
}
