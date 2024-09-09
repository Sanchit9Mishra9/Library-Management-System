import express from "express";
import { verifyAdmin } from "./auth.js";
import { CreateStudents } from "../controllers/studentsControllers.js";

const router = express.Router();

router.post("/register", verifyAdmin, CreateStudents);

export { router as studentRouter };
