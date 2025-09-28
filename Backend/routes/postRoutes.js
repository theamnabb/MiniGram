import { commentonPost, deleteComment, deletePost, editCaption, getAllPosts, likeUnlikePost, newPost } from '../controller/postcontroller.js';
import { isAuth } from '../middleware/isAuth.js';
import uploadFile from '../middleware/multer.js';

import express from 'express'

const router = express.Router()
//uploadFile 
router.post("/new",isAuth,uploadFile,newPost)
router.delete("/:id", isAuth,deletePost)
router.put("/:id", isAuth,editCaption)
router.get("all",isAuth,getAllPosts)
router.post("/like/:id",isAuth,likeUnlikePost)
router.post("/comment/:id",isAuth,commentonPost)
router.delete("/comment/:id",isAuth,deleteComment)


export default router;