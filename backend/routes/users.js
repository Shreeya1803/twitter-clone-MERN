import express from 'express';
import { getUser, update, deleteuser, follow ,unFollow} from '../controllers/user.js';
import { verifytoken } from '../verfytoken.js';

const router = express.Router();
 
//update user
router.put('/:id', verifytoken, update);

// Get User
router.get("/find/:id", getUser);

//Delete User
router.delete('/:id', verifytoken, deleteuser);


//follow user
router.put('/follow/:id', verifytoken,follow);


//unfollow user
router.put('/unfollow/:id', verifytoken,unFollow);
export default router;