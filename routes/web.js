import express from 'express'
import userRegistration from '../controller/userRegistration.js';
import UserLogin from '../controller/UserLogin.js';
import checkAuth from '../middleware/Authentication.js'
import UserCreateBlock from '../controller/UserCreateBlock.js';
import userViewBlock from '../controller/userView.js';


const route = express();

// public routes
route.post('/register',userRegistration)
route.post('/login',UserLogin)


// Protected Routes
route.use('/create-block',checkAuth);
route.post('/create-block',UserCreateBlock)
route.use("/view-block",checkAuth)
route.get("/view-block",userViewBlock)

export default route