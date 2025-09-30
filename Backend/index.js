import express from 'express'
import dotenv from 'dotenv'
import { connectDb } from './database/db.js';
import  userRoutes from './routes/userRoutes.js'
import  authRoutes from './routes/authRoutes.js'
import  postRoutes from './routes/postRoutes.js'
import cookieParser from "cookie-parser" 
import cors from "cors";

import cloundinary from "cloudinary"

dotenv.config();


cloundinary.v2.config({
    cloud_name :process.env.Cloudinary_Cloud_Name,
    api_key : process.env.Cloudinary_Api,
    api_secret : process.env.Cloudinary_Secret
})



const app = express()

const allowedOrigins = [
  "http://localhost:5173",         // local dev
  "https://minisocial-beta.vercel.app" // your frontend domain on Vercel
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,   // important if using cookies or auth headers
}));

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

