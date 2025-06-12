
------------------ YouTube Clone --------------

A full-stack YouTube clone where users can view and interact with videos

Setup
1. Install MongoDb Compass in desktop
Run commands =>
2. npm install 
    Install all the require dependencies
3. npm start => 
    start the server on 8000
    create the database name youtube_clones on mongodb
    added the dummy data of youtube videos and users in database

----------------------- Login credentials ------------------------------
1. aish@gmail.com         || password : 1234
2. Internshala@gmail.com || password : 1234
3. youtuber@gmail.com   ||  password : 1234


------------------------------------ Git =>
Backend :
https://github.com/Aishwaryajadhav2000/youtube_clone_backend


Frontend : 
https://github.com/Aishwaryajadhav2000/YouTube_clone

---------------workflow----
https://drive.google.com/file/d/1wWQ0TY3OilGouXch9geOuv4WoaPPnPha/view?usp=sharing



---------------------------.env =>
Database setup Can change according to requirements

--------------------------------- Middleware : ------------------------- 
    error handling for all API routes
1. log the details of each request : method, URL, status code , ip ,
    headers , request body , request query , requested parameters , Time

2. Middleware 3 : => index.js
Implement to check invalid URL

3. Middleware 4 : => index.js
Implement for error handling ( if incorrect json file )

4. Middleware : verify Token
 To check and verify the details of user and return JWT token while loggingin


------------------------------------ API's and working flow--------------------

--------------------Users--------------------
app.post('/register', register);
register : USer can register by entering details



//POST/login: Authenticate user and return a JWT token.
app.post('/login', login)
login : user can login by entering valid details only
        1. invalid email show error message : email not exist
        2. invalid password show error : invalid credentials


//Fetching user details
app.get('/getuser' , protect , getCurrentUser)

----------------------- Channels--------------
1. create channel for user
    app.post('/createchanneldemo' , protect, creatch);

2. get channel for user
    app.get('/getchannel' ,protect, getUserChannel)


------------------- Search-----------------
router.get("/suggestions", getSearchSuggestions);
router.get("/", searchContent);
    Search the videos and give suggestions

--------------------------Videos-------------------------
1.  router.get('/videos', getAllVideos);
    get all videos to show on dashboard

2. get videos by id while watching
   router.get("/videos/:videoId", getVideoById);


