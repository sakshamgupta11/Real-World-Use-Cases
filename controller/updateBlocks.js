import { v4 as uuidv4 } from "uuid";
import connection from "../confic/DB.js";


const logApiResponse = async (apiName, requestData, responseData, statusCode, userId = null) => {
    await connection.promise().query(
        "INSERT INTO company_db.api_logs (id, api_name, request_data, response_data, status_code, user_id) VALUES (?, ?, ?, ?, ?, ?)",
        [uuidv4(), apiName, requestData, responseData, statusCode, userId]
    );
};


const updateBlocks = async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const apiName = "updateBlocks"; 
    const requestData = JSON.stringify(req.body); 
    
    const userId = req.user ? req.user.id : null; 

    try {
        if (!title || !content) {
            const errorResponse = { "status": "failed", "message": "All fields are required" };
            await logApiResponse(apiName, requestData, JSON.stringify(errorResponse), 400, userId);
            return res.status(400).json(errorResponse);
        }

        const [updateResult] = await connection.promise().query(
            "UPDATE company_db.blogs SET title = ?, content = ?, modified_at = CURRENT_TIMESTAMP WHERE id = ?",
            [title, content, id]
        );

        if (updateResult.affectedRows === 0) {
            const errorResponse = { "status": "failed", "message": "Blog not found" };
            await logApiResponse(apiName, requestData, JSON.stringify(errorResponse), 404, userId);
            return res.status(404).json(errorResponse);
        }

        const [user_data] = await connection.promise().query(
            "SELECT id, title, content, author_id, created_at, modified_at FROM company_db.blogs WHERE id = ?",
            [id]
        );

        const successResponse = {
            "status": "success",
            "message": "Updated successfully",
            "result": user_data[0]
        };

        await logApiResponse(apiName, requestData, JSON.stringify(successResponse), 200, userId);
        res.status(200).json(successResponse);

    } catch (error) {
        const errorResponse = {
            "status": "failed",
            "message": "Internal server error",
            "error": error.message
        };

        await logApiResponse(apiName, requestData, JSON.stringify(errorResponse), 500, userId);
        res.status(500).json(errorResponse);
    }
};

export default updateBlocks;
