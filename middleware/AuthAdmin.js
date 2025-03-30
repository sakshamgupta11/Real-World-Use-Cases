import jwt from "jsonwebtoken";
import connection from "../confic/DB.js";

const checkAuthForAdmin = async (req, res, next) => {
    const authorization = req.headers.authorization?.trim(); // Handle spaces

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(400).json({ status: "failed", message: "Unauthorized: No token provided" });
    }

    const token = authorization.split(" ")[1];

    try {
        // Verify JWT token
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Fetch user data from DB where role is 'admin'
        const [rows] = await connection.promise().query(
            "SELECT id, name, email, created_at, role FROM company_db.users WHERE id = ? AND LOWER(role) = 'admin'",
            [id]
        );

        if (rows.length === 0) {
            return res.status(403).json({ status: "failed", message: "Forbidden: Admin access required" });
        }

        req.user = rows[0]; // Store user data in request object
        next(); // Proceed to the next middleware/controller
    } catch (error) {
        let message = "Unauthorized: Invalid token";
        if (error.name === "TokenExpiredError") {
            message = "Unauthorized: Token expired";
        }
        return res.status(401).json({ status: "failed", message });
    }
};

export default checkAuthForAdmin;
