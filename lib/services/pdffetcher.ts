import logger from '../util/logger';
import fetch from 'node-fetch';
import fs from 'fs';
import FileModel from '../model/file';
import {
  CONTENT_TYPE_HEADER,
  FILE_TYPE,
  PDF_CONTENT_TYPE
} from '../util/constants';
import { IFileModel } from '../model/file.interface';
import { getFullPath } from '../util/helper';

export default class PDFFetcher {
  url: string;
  file: IFileModel;
  filePath: string;

  constructor(url: string) {
    this.url = url;
    this.file = new FileModel();
    this.filePath = getFullPath(`${this.file.id}.${FILE_TYPE.PDF}`);
  }

  async getFetchPdfStream() {
    if (!this.url) {
      logger.error(`[getFetchPdfStream] Invalid url`)
      throw new Error('INVALID_URL');
    }
    const res = await fetch(this.url);

    if (!res.ok) {
      logger.error(`[getFetchPdfStream] unable to get file ${this.url}`)
      throw new Error('UNABLE_TO_FETCH');
    }

    if (res.headers.get(CONTENT_TYPE_HEADER) !== PDF_CONTENT_TYPE) {
      logger.error(`[getFetchPdfStream] not pdf file ${this.url}`)
      throw new Error('NOT_PDF_FILE');
    }

    return res;
  }

  async getPdfWriteStream() {
    const readPdfStream = await this.getFetchPdfStream();
    const writePdfStream = fs.createWriteStream(this.filePath);
    readPdfStream.body.pipe(writePdfStream);

    return writePdfStream;
  }

  async persistFileInfo(
    resolve: (doc: IFileModel) => void,
    reject: (reason?: any) => void
  ) {
    try {
      this.file.path = this.filePath;
      this.file.type = FILE_TYPE.PDF;

      const fileInfo = await this.file.save();
      logger.info(`[persistFileInfo] file info persisted in db`);
      resolve(fileInfo);
    } catch(err) {
      logger.info(`[persistFileInfo] unable to persist file info in db`, err);
      reject(err)
    }
  }

  async process(): Promise<IFileModel> {
    const writeStream = await this.getPdfWriteStream();
    return new Promise((resolve,reject) => {
      writeStream.on('finish', () => {
        this.persistFileInfo(resolve, reject);
      });
      writeStream.on('error', reject);
    })
  }
}
