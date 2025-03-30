import connection from "../confic/DB.js";


const deleteBlocks =  async(req,res)=>{
    const {id} = req.params
    try {
        
const [user] =  await connection.promise().query(
    "delete from company_db.blogs where author_id =?",[id]
)

if (user.affectedRows === 0) {
    return res.status(404).json({
        status: "failed",
        message: "User does not exist or has no blogs"
    });
}


    res.status(200).json({
        status:"success",
        message:"User has been delete successfully",
        data:user
    })

    } catch (error) {
        res.status(500).json({
            "status":"faild",
            "message":"internal server error",
            error:error.message
        })
    }
}

export default deleteBlocks