import connection from "../confic/DB.js";

const UserViewByID = async (req, res) => {
    const { id } = req.params;
    console.log("Received ID:", id); // Debugging line

    try {
        const [userData] = await connection.promise().query(
            "SELECT * FROM company_db.blogs WHERE id = ?", [id]
        );

        if (userData.length === 0) {
            return res.status(404).json({ status: "failed", message: "No data found for this ID" });
        }

        res.status(200).json({ result: userData });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
            error: error.message
        });
    }
};

export default UserViewByID;
