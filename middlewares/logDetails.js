//MiddleWare 1
//Use middleware to log the details of each request (e.g., method, URL, status code). 
export default function detailsMiddleware(req,res,next){
   

        //condition for the time : allow to call apis only between 6am to 8pm
        // const curTime = new Date();
        // const curHours = curTime.getHours();
        // if (curHours < 6 || curHours > 20) {
        //     console.log("API access is allowed only from 6am to 8pm")

        //     return res.status(410).json({
        //         error: "Access Denied...",
        //         message: "API access is allowed only from 6am to 8pm"
        //     });
        // }

        // Log status code after response is sent
        res.on("finish", () => {
            const currentTime = new Date().toISOString()
            console.log("=== Incoming Request ============");

            //Log the HTTP method used to (GET ,POST , etc);
            console.log(`Method  :  ${req.method}`);

            //Logs Original Requesed URL
            console.log(`URL  :  ${req.originalUrl} `);

            //Logs the IP address of request
            console.log(`IP Address  :  ${req.ip}`);

            //Logs haders in the requests
            console.log(`HEaders  :  ${JSON.stringify(req.headers)}`);

            //Logs body of request (GET , PUT , POST, etc )
            console.log(`Body  :  ${JSON.stringify(req.body)}`);

            //Logs query parameters
            console.log(`Query Params  :  ${JSON.stringify(req.query)}`);

            //logs route parameters
            console.log(`Route Params  :  ${JSON.stringify(req.params)}`);

            //logs status (200 , 200, 400, 401, etc)
            console.log(`Status  :  ${res.statusCode}`);

            //logs time
            console.log(`time : ${currentTime}`);
            console.log("=================================");

        });

        //continue
        next();
   
}