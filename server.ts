import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db";
import documentRoutes from "./routes/documentRoutes";

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "http://45.32.83.124:5173", // Change this to match your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect Database
connectDB();

// Use Routes
app.use("/api", documentRoutes);

// Start server
const PORT: number = parseInt(process.env.PORT || "5001", 10);
const HOST: string = "0.0.0.0"; // Bind to all available IPs

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
