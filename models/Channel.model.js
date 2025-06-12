// import mongoose from "mongoose";

// const channelSchema = new mongoose.Schema({
//   channelId: { type: String },
//   channelName: { type: String, required: true },
//   handle: { type: String, required: true },
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: "youtube_users", required: true },
//   channelImage: { type: String },
// });

// export default mongoose.model("Channel", channelSchema);

































































import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  handle: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // profileImage: {
  //   type: String // optional: URL to profile image
  // }
});

const userChannel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "youtube_users", // assumes you have a User model
    required: true
  },
  channelData : {
    type : [channelSchema],
     //validator
        validate : {
            validator : function(data){
                return this.isNew ? data.length > 0 : true;
            },
             message: "channelData must contain at least one channel when creating."
        }
  }
})

// export default mongoose.model("Channel", channelSchema);
const channelCreate = mongoose.model("Channel" , userChannel);

export default channelCreate
