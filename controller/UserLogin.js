import connection from "../confic/DB.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: "failed", message: "All fields are required" });
        }

        const [checkUser] = await connection.promise().query(
            'SELECT * FROM company_db.users WHERE email = ?', [email]
        );

        if (checkUser.length === 0) {
            return res.status(400).json({ status: "failed", message: "User does not exist" });
        }

        const user = checkUser[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "failed", message: "Email or password is incorrect" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "10d",
        });

        await connection.promise().query(
            'UPDATE company_db.users SET auth_token = ? WHERE id = ?',
            [token, user.id]
        );

        res.status(200).json({ status: "success", message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ status: "failed", message: "Internal server error", error: error.message });
    }
};

export default UserLogin;
