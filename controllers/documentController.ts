import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import Document from '../models/Document';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

interface DocumentData {
  fileName: string;
  filePath: string;
  uploadDate: Date;
  extractions?: any[];
}

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, "uploads/");
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).single("file");

const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    const documents = await Document.find();

    if (!documents || documents.length === 0) {
      res.status(404).json({ message: "No documents found" });
      return;
    }

    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

const getExtractions = async (req: Request, res: Response): Promise<void> => {
  try {
    const document = await Document.findById(req.params.documentId);
    if (!document) {
      res.status(404).json({ message: "Document not found" });
      return;
    }

    res.status(200).json(document.extractions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching extractions", error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

const uploadDocument = async (req: MulterRequest, res: Response): Promise<void> => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({ message: "File upload failed", error: err.message });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    try {
      const newDocument = new Document({
        fileName: req.file.originalname,
        filePath: `/uploads/${req.file.filename}`,
        uploadDate: new Date(),
      });

      await newDocument.save();

      res.status(201).json({
        message: "Document uploaded successfully",
        fileName: newDocument.fileName,
        filePath: newDocument.filePath,
        uploadDate: newDocument.uploadDate,
      });
    } catch (error) {
      res.status(500).json({ message: "Error saving document", error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });
};

export { getData, getExtractions, uploadDocument }; 