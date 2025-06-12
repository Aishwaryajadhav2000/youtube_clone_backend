import express from "express";
import mongoose from "mongoose";
import connectDatabase from "./database/database.js";
import cors from "cors";
import { userRoutes } from "./routes/users.route.js";
// import { channeRoutes } from "./routes/channel.routes.js";
import detailsMiddleware from "./middlewares/logDetails.js";
import channelRoutes from "./routes/channel.routes.js"

const app = express();

//Middleware to parse incoming JSON requests
app.use(express.json());

// Use Mongoose to connect your Node.js application to a MongoDB database
connectDatabase();

//Middleware : Log details
app.use(detailsMiddleware)

app.get('/', (req, res) => {
    res.send("Welcome to root router")
});

/**
 * Middleware setup for CORS (Cross-Origin Resource Sharing).
 * Allows requests from specified origins and enables credentials to be included.
 */
const allowedOrigins = [
  "http://localhost:5174"
];


// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (like mobile apps or curl)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // allows cookies and Authorization headers
// }));

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
});



//Routing
userRoutes(app)
// channeRoutes(app)
app.use("/api/channels", channelRoutes);


// MiddleWare
// For invalid routing
app.use((req, res) => {
    res.status(502).json({
        error: "Invalid routing",
        message: `The requested URL ( ${req.originalUrl} ) not found on this server.. Please Enter valid URL.`
    })
})

//  middleware => Error-handling
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(417).json({
            error: "Invalid JSON",
            message: "Please check your request body. Make sure JSON is properly formatted."
        });
    }
    next(err); // Pass to default error handler if not a JSON error
});
