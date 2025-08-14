import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRoutes } from "./routes/users.route.js";
import detailsMiddleware from "./middlewares/logDetails.js";
import { channelRoute } from "./routes/channel.routes.js";
import videoRoutes from "./routes/video.routes.js"
import { runAllSeeders } from "./seeder/masterSeeder.js";
import connectDB from "./database/db.js";
import dotenv from "dotenv";
import searchRoute from "./routes/search.route.js"

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();
//Middleware to parse incoming JSON requests
app.use(express.json());

// Use Mongoose to connect your Node.js application to a MongoDB database
// connectDatabase();

//Middleware : Log details
app.use(detailsMiddleware)

// app.get('/', (req, res) => {
//     res.send("Welcome to root router")
// });

//allowed origins of frontend
const allowedOrigins = [
   "http://localhost:4200"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());


//Routing
//users Routing
userRoutes(app)
//Channels routing
channelRoute(app)
// app.use('/uploads/videos', express.static(path.join(process.cwd(), 'uploads/videos')));
//Videos routing
app.use('/api', videoRoutes);
app.use("/uploads", express.static("uploads"));
//Searching videos routing
app.use("/api/search" , searchRoute)


// MiddleWare
// For invalid routing
// app.use((req, res) => {
//     res.status(502).json({
//         error: "Invalid routing",
//         message: `The requested URL ( ${req.originalUrl} ) not found on this server.. Please Enter valid URL.`
//     })
// })

//  middleware => Error-handling
// app.use((err, req, res, next) => {
//     if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//         return res.status(417).json({
//             error: "Invalid JSON",
//             message: "Please check your request body. Make sure JSON is properly formatted."
//         });
//     }
//     next(err); // Pass to default error handler if not a JSON error
// });

//  Connects to the database and starts the Express server.
connectDB().then(async () => {
  await runAllSeeders();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});