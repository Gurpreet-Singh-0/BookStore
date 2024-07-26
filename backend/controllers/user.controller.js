import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import {Book} from "../models/books.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addBook = asyncHandler(async (req,res)=>{
    const {description, author, bookName,price} = req.body;
    if([description,author, bookName,price].some((field)=>(
        field.trim()===""
    ))){
        throw new ApiError(404, "All fields are required while adding the book")
    }

    const existingBook = await Book.findOne({
        $or:{bookName}
    })
    if(existingBook){
        throw new ApiError(409,"Book is already present");
    }

    const imagePath = req.files?.image[0]?.path;
    if(!imagePath){
        throw new ApiError(400, "Image is required");
    }

    const image = await uploadOnCloudinary(imagePath);
    if(!image){
        throw new ApiError(400,"Image is required");
    }

    const book = await Book.create({
   
        description,
        author,
        bookName,
        image:image.url,
        price
    })

    const createdBook = await Book.findById(book._id);
    if(!createdBook){
        throw new ApiError(500, "Failed to create a user");
    }
    return res.status(201)
    .json(new ApiResponse(200,createdBook,"Book added Successfully"));
    
})

const getBooks = asyncHandler(async(req, res)=>{
    try {
        const books = await Book.find();
        return res.status(200)
        .json(new ApiResponse(200,books,"books fetched successfully"))
    } catch (error) {
        console.log("Unable to fetch Books");
    }
})

const getById = asyncHandler(async(req, res)=>{
    try {
        const id= req.params.id;
        const book= await Book.findById(id);
        res.status(200)
        .json(
            new ApiResponse(200,book,"Book fetched successfully with id")
        )
    } catch (error) {
        console.log("Unable to fetch book by ID");
    }
})

const updateBook = asyncHandler(async(req,res)=>{
        const id = req.params.id;
        const {description,author,bookName,price}= req.body;
        if(!description || !author || !bookName || !price){
            throw new ApiError(400,"Please fill the data for updation")
        }
        const book = await Book.findByIdAndUpdate(id,{
            $set:{
                description,
                author,
                bookName,
                price
            }
        }, {new:true}
    )
    return res.status(200)
    .json(new ApiResponse(200,book,"Updated Successfully"))
})

const updateImg = asyncHandler(async (req, res) => {
    try {
     
        if (!req.file || !req.file.path) {
            throw new ApiError(400, "Image file is required.");
        }

        // Get the path of the uploaded image file
        const imgPath = req.file.path;


        // Upload the image to Cloudinary
        const newImg = await uploadOnCloudinary(imgPath);

    

        // Check if the image was successfully uploaded to Cloudinary
        if (!newImg.url) {
            throw new ApiError(500, "Error while uploading image to Cloudinary.");
        }

        // Update the book's image URL in the database
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { image: newImg.url },
            { new: true } // Return the updated document
        );

        // Check if the book was found and updated
        if (!updatedBook) {
            throw new ApiError(404, "Book not found.");
        }

        // Respond with the updated book details
        return res.status(200).json(
            new ApiResponse(200, updatedBook, "Image updated successfully.")
        );
    } catch (error) {
        // Log the error for debugging
        console.error('Error in updateImg:', error);

        // Respond with the error details
        return res.status(error.statusCode || 500).json(
            new ApiError(error.statusCode || 500, error.message)
        );
    }
});

const deleteBook = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    try {
         await Book.findByIdAndDelete(id).then(()=>res.status(200).json(new ApiResponse(
            200, "book deleted"
         )))
    } catch (error) {
        console.log("An error occured while deleting the file");
    }
})


export {
    addBook,
    getBooks,
    getById,
    updateBook,
    updateImg,
    deleteBook
}