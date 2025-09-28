import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './database/db.js';
import  userRoutes from './routes/userRoutes.js'
import  authRoutes from './routes/authRoutes.js'
import  postRoutes from './routes/postRoutes.js'
import cookieParser from "cookie-parser" 

import cloundinary from "cloudinary"

cloundinary.v2.config({
    cloud_name :process.env.Cloudinary_Cloud_Name,
    api_key : process.env.Cloudinary_Api,
    api_secret : process.env.Cloudinary_Secret
})

dotenv.config();

const app = express()
app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT;

app.use("/api/auth",authRoutes)

app.use("/api/user",userRoutes)

app.use("/api/post",postRoutes)



app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDb()
})

