import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }
    try {
await mongoose.connect(process.env.MONGODB_URL, {
    dbName: "chit-chat",
    newURLParser: true,
    useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB is connected successfully");
    }catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
}