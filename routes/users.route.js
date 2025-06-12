import { getCurrentUser, login, register } from "../controllers/users.controller.js";
import { protect } from "../middlewares/verifyToken.js";


//routes for User Registration and User Login.
export function userRoutes(app) {

    //POST/register: Register a new user.
    app.post('/register', register);

    //POST/login: Authenticate user and return a JWT token.
    app.post('/login', login)

    //Fetching user details
    app.get('/getuser' , protect , getCurrentUser)
}

