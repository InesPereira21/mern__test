// require("dotenv").config();
// const express = require('express');
// const https = require('https');
// const fs = require('fs');
// const mongoose = require("mongoose");
// // const cors = require('cors');
// const app = express();
// const workoutRoutes = require("./routes/workouts");

// // Middleware
// app.use(express.json());
// app.use((req, res, next) => {
//     console.log(req.path, req.method);
//     next();
// });

// app.use("/api/workouts", workoutRoutes);

// // Connect to DB
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         // Load SSL/TLS certificates
//         const options = {
//             key: fs.readFileSync('path/to/private-key.pem'),   // Replace with actual private key path
//             cert: fs.readFileSync('path/to/certificate.pem')   // Replace with actual certificate path
//         };

//         // Create HTTPS server
//         const server = https.createServer(options, app);
//         server.listen(process.env.PORT, () => {
//             console.log('Connected to DB & Listening on port 4000 (HTTPS)');
//         });
//     })
//     .catch((error) => {
//         console.log(error);
//     });



// __________________________ Original Down

const https = require('https');
require("dotenv").config()

const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors'); // Import the CORS middleware

//express app
const app = express()
const workoutRoutes = require("./routes/workouts")

// Use CORS middleware to allow requests from any origin (for development)
app.use(cors())

//middleware
app.use(express.json()) // FOR ANY REQUEST we send, 
// it looks if there is any 
// data being sent to the server
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use("/api/workouts", workoutRoutes)

// Connect to DB
const port = process.env.PORT || 4000
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests on a port number
        app.listen(port, () => {
            console.log('Connected to DB & Listening on port: ' + port)
        })
    })
    .catch((error) => {
        console.log(error)
    })