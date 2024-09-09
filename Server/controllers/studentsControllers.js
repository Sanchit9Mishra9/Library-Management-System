import { Student } from "../models/Student.js";
import bcrypt from "bcrypt";

async function CreateStudents(req, res) {
  try {
    const { username, password, roll, grade } = req.body;
    const student = await Student.findOne({ username });
    if (student) {
      console.log("1");
      return res.json({ message: "student is already registered" });
    }
    console.log("2");

    const hashPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      username,
      password: hashPassword,
      roll,
      grade,
    });
    console.log("3");

    await newStudent.save();
    console.log("4");

    return res.json({ registered: true });
  } catch (e) {
    console.log("5");

    return res.json({ message: "Error in registered student" });
  }
}

export { CreateStudents };
