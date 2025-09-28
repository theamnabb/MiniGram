import getDataUrl from "../utils/urlGenerator.js";
import { User } from "../models/userModel.js";
import TryCatch from "../utils/TryCatch.js";
import cloudinary from 'cloudinary'
import bycrypt from "bcrypt"


export const myProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id).select("-password");

    res.json(user);

})


export const userProfile = TryCatch(async(req,res) =>{
    const user = await User.findById(req.params.id).select("-password");
    if(!user)
        return res.status(404).json({
        message : "No User with this id"
    })
    res.json(user);
})

export const followandUnfollowUser = TryCatch(async(req,res)=>{
    const user = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if(!user)
         return res.status(404).json({
        message : "No User with this id"
    })

    if(user._id.toString() === loggedInUser._id.toString())
        return res.status(400).json({
    message : "You cannot follow yourself"
    })
  if(user.followers.includes(loggedInUser._id)){
    const indexFollowing = loggedInUser.followings.indexOf(user._id);
    const indexFollower = user.followers.indexOf(loggedInUser._id);
    loggedInUser.followings.splice(indexFollowing,1)
    user.followers.splice(indexFollower,1)
    await loggedInUser.save();
  await user.save();
  res.json({
    message: "User Unfollowed"
  })
  }
  
  else{
    loggedInUser.followings.push(user._id)
    user.followers.push(loggedInUser._id)
await loggedInUser.save();
  await user.save();
  res.json({
    message: "User followed"
  })
    

  }

})

export const userFollowerandFollowingData = TryCatch(async(req,res) =>{
const user = await User.findById(req.params.id).select("-password").populate("followers", "-password").populate("followings", "-password");

const followers = user.followers;
const followings = user.followings

res.json({
    followers,
    followings
})

})


export const updateProfile = TryCatch(async(req,res) =>{
    const user = await User.findById(req.user._id);
    const {username} = req.body;
    if(username){
        user.username = username;
    }
    const file = req.file;
    if(file){
        const fileUrl = getDataUrl(file)
        await cloudinary.v2.uploader.destroy(user.profilePic.id);
        const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content)
        user.profilePic.id = myCloud.public_id;
        user.profilePic.url = myCloud.secure_url;
    }
    await user.save();
    res.json({
        message: "Profile updated"
    })

})

export const updatePassword = TryCatch(async(req,res) =>{
    const user = await User.findById(req.user._id);
    const {oldPassword,newPassword} = req.body;

    const comparePassword = await bycrypt.compare(oldPassword,user.password);

    if(!comparePassword) return res.status(400).json({
        message : "Wrong old password"
    })
    user.password = await bycrypt.hash(newPassword,10);
    await user.save();
    res.json({
        message : "Password Updated "
    })
})

export const getAllUsers = TryCatch(async(req,res) =>{

    try {
        const search = req.query.search || ""

    const users = await User.find({
        username:{
            $regex:search,
            $options: "i",
        },
        _id : {$ne: req.user._id}
    }).select("-password");
    res.json(users);
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }

     

})
