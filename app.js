import express from "express"
import dotevn from "dotenv"
dotevn.config();
import cors from "cors"
import route from "./routes/web.js";


const port = process.env.PORT

const app = express();
app.use(express.json())
app.use(cors());
app.use('/api/user',route)

app.listen(port,()=>{
    console.log(`App is running on port http://localhost:${port}`)
})