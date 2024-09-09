import express from "express";

import bcrypt from "bcrypt";
import { Admin } from "./models/Admin.js";
import "./db.js";

async function AdminAccount() {
  try {
    const adminCount = Admin.countDocuments();
    if (adminCount === 0) {
      const hashPassword = await bcrypt.hash("admin", 10);
      const newAdmin = new Admin({
        username: "admin",
        password: hashPassword,
      });
      await newAdmin.save();
      console.log("Accout created");
    } else {
      console.log(adminCount);
      console.log("Accout already exist");
    }
  } catch (e) {
    console.log("error in seed.js->" + e);
  }
}

AdminAccount();
