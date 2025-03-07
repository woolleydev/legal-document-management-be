import mongoose, { Document as MongooseDocument } from 'mongoose';

interface IExtraction {
  page: number;
  content: string;
}

interface IDocument extends MongooseDocument {
  fileName: string;
  uploadDate: Date;
  filePath: string;
  extractions: IExtraction[];
}

const documentSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  filePath: { type: String },
  extractions: [
    {
      page: Number,
      content: String,
    },
  ],
});

const Document = mongoose.model<IDocument>('Document', documentSchema);

export default Document; 