import express from 'express'
import userRegistration from '../controller/userRegistration.js';
import UserLogin from '../controller/UserLogin.js';
import checkAuth from '../middleware/Authentication.js'
import UserCreateBlock from '../controller/UserCreateBlock.js';
import userViewBlock from '../controller/userView.js';
import UserViewByID from '../controller/userViewByID.js';
import checkAuthForAdmin from '../middleware/AuthAdmin.js';
import deleteBlocks from '../controller/deleteblock.js';


const route = express();

// public routes
route.post('/register',userRegistration)
route.post('/login',UserLogin)


// Protected Routes
route.use('/create-block',checkAuth);
route.post('/create-block',UserCreateBlock)
route.use("/view-block",checkAuth)
route.get("/view-block",userViewBlock)
route.use('view-block/:id',checkAuth)
route.get('/view-block/:id',UserViewByID)

// for admin
route.use("/delete/block/:id",checkAuthForAdmin)
route.delete("/delete/block/:id",deleteBlocks)

export default route