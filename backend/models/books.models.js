import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

    description:{
        type:String,
        required: true,
    },

    author:{
        type:String,
        required:true,
    },

    bookName:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },

    price:{
        type:Number,
        required:true,
    }

}, {timestamps:true});

export const Book = mongoose.model("Book", bookSchema);