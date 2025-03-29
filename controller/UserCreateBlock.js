import connection from "../confic/DB.js";
import { v4 as uuidv4 } from "uuid";

const UserCreateBlock = async (req, res) => {
    // Extracting title and content from request body
    const { title, content } = req.body;

    try {
        // Checking if both title and content are provided
        if (!title || !content) {
            return res.status(400).json({ status: "failed", message: "All fields are required." });
        }

        // Generating a unique ID for the new block
        const id = uuidv4();

        // Getting the author's ID from the authenticated user (middleware should set this)
        const author_id = req.user?.id;

        // If no author ID is found, return unauthorized error
        if (!author_id) {
            return res.status(401).json({ status: "failed", message: "Unauthorized: Missing author ID." });
        }

        // Inserting the new block (blog) into the database
        const [result] = await connection.promise().query(
            'INSERT INTO company_db.blogs (id, title, content, author_id, created_at) VALUES (?, ?, ?, ?, NOW())',
            [id, title, content, author_id]
        );

        // Fetching the newly inserted block details from the database
        const [block_data] = await connection.promise().query(
            "SELECT title, content FROM company_db.blogs WHERE id = ?",
            [id]
        );

        // Checking if the block was successfully inserted
        if (result.affectedRows > 0) {
            res.status(201).json({
                status: "success",
                message: "Block created successfully",
                block: block_data[0], // Returning only the first row
            });
        } else {
            res.status(500).json({ status: "failed", message: "Failed to create block." });
        }

    } catch (error) {
        // Handling any internal server errors
        return res.status(500).json({
            status: "failed",
            message: "Internal server error",
            error: error.message, // Returning error message for debugging
        });
    }
};

export default UserCreateBlock;
