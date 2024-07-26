import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const connectDB = async()=>{
try {
    const db = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
    console.log("DB Connected Successfully");
} catch (error) {
    console.log("Unable to connect DB");
    process.exit(1);
}
}
export default connectDB;