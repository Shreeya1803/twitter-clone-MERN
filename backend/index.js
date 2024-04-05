import  express  from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";
import User from "./models/User.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auths.js";
import tweetRoute from "./routes/tweets.js";
const app = express();
dotenv.config();
// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = './public/images'; // Destination folder for storing images
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, 'profile-pic-' + Date.now() + path.extname(file.originalname)); // Filename setup
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // File size limit if needed
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('profilePicture'); // 'profilePicture' should match the field name in the form

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/; // Allowed file extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images only!');
  }
}
// Connect to MongoDB
const connect = () => {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.MONGO)
      .then(() => {
        console.log("connect to DB");
      })
      .catch((err) => {
        throw err;
      });
  };

   app.use(cookieParser());
  app.use(express.json());
  // Multer endpoint for uploading profile picture
  app.post('/api/users/:id/uploadProfilePic', async (req, res) => {
    try {
      // Upload the file using Multer
      upload(req, res, async (err) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          if (req.file === undefined) {
            res.status(400).json({ message: 'Error: No File Selected!' });
          } else {
            const imagePath = '/images/' + req.file.filename;
            // Save the image path in the database
            const user = await User.findById(req.params.id);
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
            user.profilePicture = imagePath;
            await user.save();
            res.status(200).json({ message: 'File Uploaded Successfully', imagePath: imagePath });
          }
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

// Routes
  app.use("/api/users",userRoute);
  app.use("/api/auth",authRoute);
  app.use("/api/tweets",tweetRoute);
  // Start server
app.listen(5000 ,() => {
    connect();
    console.log("Listening on port 5000");
});
