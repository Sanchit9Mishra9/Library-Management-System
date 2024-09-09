import express from "express";
import { Book } from "../models/Book.js";
import { verifyAdmin } from "./auth.js";
import {
  CreateBooks,
  AllBooks,
  GetParticularBook,
  UpdateBook,
  DeleteBook,
} from "../controllers/bookController/booksController.js";
const router = express.Router();

router.post("/add", verifyAdmin, CreateBooks);
router.get("/books", AllBooks);
router.get("/books/:id", GetParticularBook);
router.put("/books/:id", UpdateBook);
router.delete("/books/:id", DeleteBook);

export { router as bookRouter };
