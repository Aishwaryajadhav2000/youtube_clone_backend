import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usersSchema from "../models/Users.model.js";


// REGISTER - Create a new user account
export function register(req, res) {
    
    // Extract user details from the request body
    const { username , firstname , lastname , email, password } = req.body;

    // Check if the user with the given email already exists
    usersSchema.findOne({ email }).then((data) => {

        // If user already exists, return a 400
        if (data) {
            return res.status(400).json({ message: "email already exist" })
        } else {
            // If not, create a new user 
            const newUser = new usersSchema({
               username, firstname, lastname , email,
                // Hash the password using bcrypt
                password: bcrypt.hashSync(password, 10)
            });

            // Save the new user to the database
            newUser.save().then((data) => {

                // Respond with success and the created user data
                return res.status(200).json({ message: "User register successfully", user: data })
            }).catch((err) => {

                // Handle validation or database errors 
                return res.status(400).json({ error: err.message })
            })
        }
    }).catch((err) => {
        // Handle error
        return res.status(400).json({ error: err.message });
    })

}

// LOGIN - Authenticate user and generate JWT token
export function login(req, res) {

    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find user by email
    usersSchema.findOne({ email })
        .then((data) => {

            // If user not found,
            if (!data) {
                return res.status(400).json({ message: "Email does not exits" })
            }

            // Compare the provided password with the hashed password stored
            let validatePAssword = bcrypt.compareSync(password, data.password);
            
            // If password doesn't match, return error
            if (!validatePAssword) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            // Generate JWT token with user ID
            let token = jwt.sign({ _id: data._id }, "secretKey", { expiresIn: '1hr' })
            
             // Return success response with user info and token
            res.status(200).json({ message : "USer login successfully" ,
                user: {
                    username : data.username,
                    email: data.email,
                    lastname : data.lastname,
                    firstname: data.firstname,
                    channels:data.channels,
                    avatar:data.avatar
                },
                accessToken: token
            })


        }).catch((err) => {
             // Handle error
            return res.status(500).json({ message: err.message })

        })

}

//fetch the user details
export const getCurrentUser = async (req, res) => {
  try {
    const user = await usersSchema.getFullProfile(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



