import { handleError } from "../error.js";
import User from "../models/User.js";
import Tweet from "../models/Tweet.js";
//get user from id
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
// update user
export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {                             //checking if matches the user
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, 
        {
        $set: req.body,
      },{new : true,}
      );

      res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
  } else{
    return next(handleError(403,"update only your profile"));
  }
};
 //delete user
 export const deleteuser = async (req, res, next) => {
    if (req.params.id === req.user.id) {                             //checking if matches the user
      try {
       await User.findByIdAndDelete(req.params.id);
       await Tweet.remove({userId: req.params.id});
  
        res.status(200).json("user deleted!");
      } catch (err) {
          next(err);
      }
    } else{
      return next(handleError(403,"update only your profile"));
    }
  };
//follow user
  export const follow = async (req, res, next) => {
      try {
        //user to follow 
        const user = await User.findById(req.params.id);


        // current user that login
        const  currentUser = await User.findById(req.body.id);
        if(!user.followers.includes(req.body.id)){
          await user.updateOne({
            $push: {followers: req.body.id },
          });
          await currentUser.updateOne({$push: {following: req.params.id}});
        } else{
          res.status(403).json("alredy follow this user");
        }
        res.status(200).json("following the user");
      } catch (err) {
          next(err);
      }
    
  };
//unfollow the user
export const unFollow = async (req, res, next) => {
  try {
    //user
    const user = await User.findById(req.params.id);
    //current user that login
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pull: { followers: req.body.id },
      });

      await currentUser.updateOne({ $pull: { following: req.params.id } });
    } else {
      res.status(403).json("you are not following this user");
    }
    res.status(200).json("unfollowing the user");
  } catch (err) {
    next(err);
  }
};