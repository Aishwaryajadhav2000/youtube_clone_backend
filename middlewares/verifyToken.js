import jwt from 'jsonwebtoken';
import usersSchema from '../models/Users.model.js';


// Middleware to protect routes by verifying JWT token
export async function protect(req, res, next) {

    // Check if the Authorization header exists and starts with 'JWT'
    if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "JWT") {

        // Extract the token from the header and verify it
        jwt.verify(req.headers.authorization.split(" ")[1], 'secretKey',
            function (err, verifiedToken) {

                // condition to check the token is invalid or expired
                if (err) {
                    return res.status(402).json({ message: "Invalid JWT token" })
                }

                //Log decoded token
                console.log("verifiedToken", verifiedToken);
                usersSchema.findById(verifiedToken._id)
                    .then((user) => {

                        // Attach user info to the request object for access in next middleware or route
                        req.user = user;
                        console.log("user", user);

                        // Proceed to the next 
                        next();;
                    }).catch((err) => {
                        return res.status(400).json({ message: err.message })
                    })
            }
        )
    } else {
        //If invalid token
        return res.status(404).json({ message: "token not found" })
    }




}



