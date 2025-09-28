import { isAuth } from '../middleware/isAuth.js';
import { followandUnfollowUser, getAllUsers, myProfile, updatePassword, updateProfile, userFollowerandFollowingData, userProfile } from '../controller/userController.js';
import express from 'express'


const router = express.Router()


router.get("/me",isAuth,myProfile);
router.get("/all",isAuth,getAllUsers);
router.get("/:id",isAuth,userProfile);
router.post("/:id",isAuth,updatePassword);
router.put("/:id",isAuth,updateProfile);

router.post("/follow/:id",isAuth,followandUnfollowUser)
router.get("/followdata/:id",isAuth,userFollowerandFollowingData)

export default router;