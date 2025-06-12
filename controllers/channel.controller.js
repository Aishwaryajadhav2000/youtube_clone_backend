import channelCreate from "../models/Channel.model.js";
import ChannelsModel from "../models/Channels.model.js";
import usersSchema from "../models/Users.model.js";
import { v4 as uuidv4 } from "uuid";

//function to create channel for user
export async function createChannel(req, res, next) {
  try {
    const { channelName, handle } = req.body;

    let getChannel = await channelCreate.findOne({ user: req.user._id });

    if (!getChannel) {
      getChannel = new channelCreate({ user: req.user._id, channelData: [] });

    }
    getChannel.channelData.push({ channelName, handle });

    await getChannel.save();
    res.json(getChannel)
  } catch (err) {
    next(err)
  }

}

//function to create channel for user
export async function creatch(req, res) {
  try {
    const { channelName, handle } = req.body;
    const userId = req.user._id;


    const newChannel = new ChannelsModel({
      channelId: uuidv4(),
      channelName,
      handle,
      owner: userId,
    });

    const channelCreated = await newChannel.save();

    const user = await usersSchema.findById(userId);

    user.channels.push(channelCreated._id);

    await user.save();

    res.status(201).json({ channelId: channelCreated.channelId });


  } catch (err) {
    console.error("Error creating channel:", err);
    res.status(500).json({ message: "Failed to create channel." });
  }
}


//function to get all channelds
export const getAllChannel = async (req, res) => {
  try {
    const channel = await ChannelsModel.findOne({
      channelId: req.params.channelId,
    }).populate("youtube_videos");
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    res.json(channel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//function to get channel details for user
export const getUserChannel = async (req, res, next) => {
  try {
    const channel = await ChannelsModel.findOne({ owner: req.user._id })
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    res.json(channel)
  } catch (err) {
    next(err);
  }

}




