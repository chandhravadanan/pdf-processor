import DocumentModel from '../model/document';
import { DocumentStatus, IDocumentModel } from '../model/document.interface';
import { IFile } from '../model/file.interface';
import TaskModel from '../model/task';
import PDFProcessorTask from './pdfprocessor';

export const createDocument = (file: IFile) => {
  return DocumentModel.create({
    file,
  })
}

export const updateThumbnail = (document: IDocumentModel, thumbnail: IFile) => {
  document.thumbnail = thumbnail;
  return document.save();
}

export const addDocument = async (url: string, webhook: string) => {
  const task = await TaskModel.create({
    url,
    webhook
  });

  // not used await, so it will processed in the background
  // it will not block api request
  const taskRunner = new PDFProcessorTask(task);
  taskRunner.execute();
}

export const getDocuments = async () => {
  return DocumentModel.find({
    status: DocumentStatus.ACTIVE
  });
}