// routes/videoRouter.js
import express from 'express';
import multer from 'multer';
import {  addComment, getAllVideos,  getVideoById } from '../controllers/video.controller.js';
import { protect } from '../middlewares/verifyToken.js';

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/videos');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage });
// router.post('/upload', upload.single('video'), uploadVideo);
//get all videos to show on dashboard
 router.get('/videos', getAllVideos);
 //get videos by id while watch
 router.get("/videos/:videoId", getVideoById);

 //add comment on video
router.post("/:id/videocomments", protect, addComment);



//  router.get("/videos/suggestions", getSearchSuggestions);
//  router.get("/videos/search", searchContent);
// router.get('/videos/:id' , findVideoById)

export default router;










