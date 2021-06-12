import { ITaskModel, TaskStatus } from '../model/task.interface';
import logger from '../util/logger';
import { checkAndInvokeWebHook } from './webhook';
import PDFFetcher from './pdffetcher';
import { IDocumentModel } from '../model/document.interface';
import ThumbnailGenerator from './thumbnail';
import { IFileModel } from '../model/file.interface';
import { createDocument, updateThumbnail } from './document';

export default class PDFProcessorTask {
  task: ITaskModel;

  constructor(task: ITaskModel) {
    this.task = task;
  }

  async updateTaskStatus(status: TaskStatus) {
    try {
      this.task.status = status;
      this.task = await this.task.save();
      checkAndInvokeWebHook(this.task);
    } catch (err) {
      logger.error(`[updateTaskStatus] unable to update status`, err);
    }
  }

  async execute() {
    if (!this.task) {
      logger.error(`[executeTask] Invalid task`)
      return;
    }

    try {
      const { url } = this.task;

      await this.updateTaskStatus(TaskStatus.IN_PROGRESS);

      const pdfFetcher = new PDFFetcher(url);
      const file: IFileModel = await pdfFetcher.process();
      const document: IDocumentModel = await createDocument(file);
      const thumbnailGen = new ThumbnailGenerator(file);
      const thumbFile: IFileModel = await thumbnailGen.generate();
      await updateThumbnail(document, thumbFile);

      await this.updateTaskStatus(TaskStatus.SUCCESS);
      logger.info(`[executeTask] completed`)
    } catch (err) {
      logger.error(`[executeTask] failed`, err);
      await this.updateTaskStatus(TaskStatus.FAILED);
    }
  }
}