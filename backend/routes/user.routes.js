import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addBook, deleteBook, getBooks, getById, updateBook, updateImg } from "../controllers/user.controller.js";

const router = Router();

router.route("/add").post(
upload.fields([
    {
        name:"image",
        maxCount:1
    }
]), addBook
 );

 router.route("/getBooks").get(getBooks);
 router.route("/getBooks/:id").get(getById);
 router.route("/updateBook/:id").put(updateBook);

 router.route("/updateImg/:id").patch(upload.single("image"), updateImg);
 router.route("/deleteBook/:id").delete(deleteBook)


export default router;