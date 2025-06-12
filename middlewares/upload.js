import multer from "multer";
import path from "path";

const storage = multer.diskStorage({


  destination: function (req, file, cb) {
    const isVideo = file.mimetype.startsWith("video/");
    cb(null, isVideo ? "uploads/videos/" : "uploads/thumbnails/");
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
 
export const uploadFields = upload.fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);
