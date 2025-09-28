import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true,unique:true }, 
    followers : [{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    followings : [{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    profilePic : {
        id:String,
        url:String,
    }
  
  },
   
  
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
