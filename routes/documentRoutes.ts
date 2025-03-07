import express, { Router } from "express";
import { getData, getExtractions, uploadDocument } from "../controllers/documentController";

const router: Router = express.Router();

router.get("/data", getData);
router.get("/:documentId", getExtractions);
router.post("/upload", uploadDocument);

export default router;
