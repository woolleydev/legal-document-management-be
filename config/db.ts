import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "legal-doc-management",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions); // Explicitly defining connection options

        console.log(`MongoDB Connected: ${conn.connection.host}, using database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${(error as Error).message}`);
        process.exit(1);
    }
};

export default connectDB;
