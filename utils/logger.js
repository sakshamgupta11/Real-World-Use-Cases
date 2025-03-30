import { v4 as uuidv4 } from "uuid";
import connection from "../confic/DB";

const logApiResponse = async (apiName, requestData, responseData, statusCode) => {
    try {
        await connection.promise().query(
            "INSERT INTO company_db.api_logs (id, api_name, request_data, response_data, status_code) VALUES (?, ?, ?, ?, ?)",
            [uuidv4(), apiName, JSON.stringify(requestData), JSON.stringify(responseData), statusCode]
        );
    } catch (error) {
        console.error("Error logging API response:", error.message);
    }
};
 export default logApiResponse