// controllers/videoController.js
import Video from '../models/Video.js';
import Playlist from '../models/Playlist.js';

const VIDEO_FOLDER = './uploads/videos';

//function controller to get all videos
export const getAllVideos = async (req, res) => {
  const videos = await Video.find()
    .populate("uploader")
    .populate("comments.userId", "username avatar");
  res.json(videos);
};
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findOne({ videoId: req.params.videoId })
      .populate("channelId") // populate the channel data
      .populate("uploader", "username avatar")
      .populate("comments.userId", "username avatar")
      .exec();
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.status(200).json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getSearchSuggestions = async (req, res) => {
  try {
    const q = req.query.q;

    if (!q || q.trim() === "") return res.json([]);

    const videoSuggestions = await Video.find({
      title: { $regex: q, $options: "i" },
    })
      .select("title _id videoId")
      .limit(5);

    const playlistSuggestions = await Playlist.find({
      name: { $regex: q, $options: "i" },
    })
      .select("name _id videos")
      .limit(5)
      .populate({
        path: "videos",
        select: "title _id videoId",
      });

    const combined = [
      ...videoSuggestions.map((v) => ({
        type: "video",
        title: v.title,
        videoId: v.videoId,
      })),
      ...playlistSuggestions.map((p) => ({
        type: "playlist",
        title: p.name,
        videos: p.videos,
        playlistId: p._id,
      })),
    ];

    res.json(combined);
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
};


export const searchContent = async (req, res) => {
  try {
    const q = req.query.q;

    if (!q || q.trim() === "") return res.json({ videos: [], playlists: [] });

    const videos = await Video.find({
      title: { $regex: q, $options: "i" },
    });

    const playlists = await Playlist.find({
      name: { $regex: q, $options: "i" },
    }).populate("videos");

    res.json({ videos, playlists });
  } catch (err) {
    console.error("Error during search:", err);
    res.status(500).json({ error: "Search failed" });
  }
};

//Add comment on video
export const addComment = async (req, res) => {
  console.log("userid" , req.user.id)
  console.log("videoid" , req.params.id)
  try {
    const { text } = req.body;
    const comment = {
      commentId: uuidv4(),
      userId: req.user.id,
      text,
      timestamp: new Date(),
    };

    const video = await Video.findOneAndUpdate(
      { videoId: req.params.id },
      { $push: { comments: comment } },
      { new: true }
    );

    res.status(201).json(video.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

