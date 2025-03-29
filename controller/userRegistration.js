import express from "express";
import connection from "../confic/DB.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const userRegistration = async (req, res) => {
  try {
    const { name, email, password, password_confirmation } = req.body;

    if (!name || !email || !password || !password_confirmation) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required",
      });
    }

    if (password !== password_confirmation) {
      return res.status(400).json({
        status: "failed",
        message: "Password and confirm password do not match",
      });
    }

    const [existingUser] = await connection.promise().query(
      "SELECT * FROM company_db.users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: "Email already exists, please login",
      });
    }

    
    const id = uuidv4();


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10d",
    });

    await connection.promise().query(
      "INSERT INTO company_db.users (id, name, email, password, auth_token) VALUES (?, ?, ?, ?, ?)",
      [id, name, email, hashedPassword, token]
    );

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default userRegistration;
