import mysql2 from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const connection = mysql2.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port: process.env.PORT1,
    connectionLimit: 10,
});
connection.getConnection((err,conn)=>{
    if(err){
        console.log('Database connection faild',err)
    }
    console.log('connected database ')
    conn.release()
})

export default connection