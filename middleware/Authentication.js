import jwt from 'jsonwebtoken';
import connection from '../confic/DB.js';

const checkAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(400).json({ status: "failed", message: "Unauthorized: No token provided" });
    }

    const token = authorization.split(" ")[1];
    // console.log(token)

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const [rows] = await connection.promise().query(
            'SELECT id, name, email, created_at FROM company_db.users WHERE id = ?',
            [id]
            
        );
        // console.log("Database Query Result:", rows);

        if (rows.length === 0) {
            return res.status(401).json({ status: "failed", message: "Unauthorized user" });
        }

        req.user = rows[0]; 
        next();
    } catch (error) {
        let message = "Unauthorized: Invalid token";
        if (error.name === "TokenExpiredError") {
            message = "Unauthorized: Token expired";
        }
        return res.status(401).json({ status: "failed", message });
    }
};

export default checkAuth;
