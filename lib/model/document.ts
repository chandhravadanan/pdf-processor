import mongoose from './connection';
import { IDocumentModel, DocumentStatus } from './document.interface';

const documentSchema = new mongoose.Schema(
  {
    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'files',
      required: true,
    },
    thumbnail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'files',
      required: false,
    },
    status: {
      default: DocumentStatus.ACTIVE,
      type: DocumentStatus,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const DocumentModel =
  mongoose.models.documents ||
  mongoose.model<IDocumentModel>(`documents`, documentSchema);

export default DocumentModel;
