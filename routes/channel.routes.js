import { creatch, getUserChannel } from "../controllers/channel.controller.js";
import { protect } from "../middlewares/verifyToken.js";

export function channelRoute(app){
    // app.post('/createchannel' , protect, createChannel)

    //create channel for user
    app.post('/createchanneldemo' , protect, creatch);

    //get channel for user
    app.get('/getchannel' ,protect, getUserChannel)

}