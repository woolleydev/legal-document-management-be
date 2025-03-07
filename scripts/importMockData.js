require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Document = require("../models/document");
const connectDB = require("../config/db");

connectDB().then(async () => {
    try {
        const mockDataPath = path.join(__dirname, "../data/mock.json");
        const mockData = JSON.parse(fs.readFileSync(mockDataPath, "utf-8"));

        await Document.insertMany(mockData); 

        console.log("Mock data successfully added to MongoDB Atlas!");
        process.exit();
    } catch (error) {
        console.error("Error inserting mock data:", error);
        process.exit(1);
    }
});
