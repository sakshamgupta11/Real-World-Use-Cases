import connection from '../confic/DB.js'


const userViewBlock = async(req,res)=>{
    try {
        const [userBlocks] =  await connection.promise().query(
            "SELECT * FROM company_db.blogs;");

            res.status(200).json({results:userBlocks})
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Internal server error",
            error: error.message, 
        });
    }
}

export default userViewBlock;