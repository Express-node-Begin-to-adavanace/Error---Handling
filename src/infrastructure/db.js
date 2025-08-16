import mongoose from "mongoose";

const ConnectedDB = async () => {
    try {
        const MONGODB_URL = process.env.MONGODB_URL;
        if(!MONGODB_URL){
            throw new Error("MONGODB_URL is not set")
        }
        await mongoose.connect(MONGODB_URL);
        console.log("connected the database....")
    } catch (error) {
        console.log("Error connecting to the database...");
        console.log(error);
    }
}

export default ConnectedDB;


