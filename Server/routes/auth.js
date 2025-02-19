import express from "express";
import { Admin } from "../models/Admin.js";
import { Student } from "../models/Student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (role === "admin") {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.json({ validornot: false, message: "admin not registeres" });
      }
      const validPassword = await bcrypt.compare(password, admin.password);
      if (!validPassword) {
        return res.json({ validornot: false, message: "wrong password" });
      }
      const token = jwt.sign(
        { role: "admin", username: admin.username },
        process.env.AdminKey
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({ login: true, role: "admin" });
    } else if (role === "student") {
      const student = await Student.findOne({ username });
      if (!student) {
        return res.json({
          validornot: false,
          message: "student not registeres",
        });
      }
      const validPassword = await bcrypt.compare(password, student.password);
      if (!validPassword) {
        return res.json({ validornot: false, message: "wrong password" });
      }
      const token = jwt.sign(
        { role: "student", username: student.username },
        process.env.Student_Key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({ login: true, role: "student" });
    } else {
    }
  } catch (e) {
    return res.json({ validornot: false, message: "error in auth" });
  }
});

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid Admin" });
  }
  jwt.verify(token, process.env.AdminKey, (err, decoded) => {
    if (err) {
      return res.json({ message: "Invalid token" });
    } else {
      req.username = decoded.username;
      req.role = decoded.role;
      next();
    }
  });
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "Invalid User" });
  } else {
    jwt.verify(token, process.env.AdminKey, (err, decoded) => {
      if (err) {
        jwt.verify(token, process.env.Student_Key, (err, decoded) => {
          if (err) {
            return res.json({ message: "Invalid token" });
          } else {
            req.username = decoded.username;
            req.role = decoded.role;
            next();
          }
        });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;

        next();
      }
    });
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ login: true, role: req.role });
});

router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  return res.json({ logout: true });
});

export { router as AdminRouter, verifyAdmin };
