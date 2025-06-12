import mongoose from "mongoose";

// Use Mongoose to connect your Node.js application to a MongoDB database
export async function connectDatabase() {

    try {

        //connect to the MongoDB database 
        await mongoose.connect("mongodb://localhost:27017/youtube_clones");

        //log confirmation message if successful
        console.log(`Database connected successfully `);

    } catch (err) {

        //If connection fails, log the error message
        console.log("Error while connecting to the database", err.message);
        
        // Exit the process with failure
        process.exit(1);
    }

    //Log for disconnection events
    mongoose.connection.on("disconnected" , ()=>{
        console.log("MongoDB disconnected ")
    })

}

export default connectDatabase;