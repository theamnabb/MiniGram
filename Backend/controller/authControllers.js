//import getDataUrl from "../utils/urlGenerator.js";
import  {User}  from "../models/userModel.js"; 
import generateToken from "../utils/generatetoken.js";

import bcrypt from "bcrypt"

import cloudinary from 'cloudinary'
import TryCatch from "../utils/TryCatch.js";


export const registerUser = TryCatch(async(req,res) =>{
        const {email, username,fullName,password} = req.body;
        //const file = req.file
        if(!username || !email || !password || !fullName ){
            return res.status(400).json({
                message: "Please give all values"
            })
        }
        
        let user = await User.findOne({email});

        if(user) return res.status(400).json({
            message : "User Already Exist",
        })
        //userProfie picture 
      //  const fileUrl = getDataUrl(file)

    const hashedPassowrd = await bcrypt.hash(password,10);

   // const myCloud = await cloudinary.v2.uploader(fileUrl.content)

   user = await User.create({
    email,
     username,
     fullName,
     password : hashedPassowrd,
    //  profilePic : {
    //     id :myCloud.public_id,
    //     url : myCloud.secure_url,
    //  }

   })

   generateToken(user._id,res);

   res.status(201).json({
    message : "User Registered",
    user,
   })
})


export const loginUser = TryCatch(async(req,res) =>{
    const { email, password} = req.body;
    const user = await User.findOne({ email });
    if(!user)
        return res.status(400).json({
     message : "Invalid Credentials "
    })

    const comparePassword = await bcrypt.compare(password,user.password);

    if(!comparePassword)
        return res.status(400).json({
    message : "Invalid Credentials "
    })
    generateToken(user._id, res);
    res.json({
        message : "User Logged In",
        user,
    })

})

export const logoutUser = TryCatch((req,res) =>{
    res.cookie("token","",{maxAge:0})

    res.json({
        message:"Logged out successfully"
    })
})