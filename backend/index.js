// const express = require('express');
// const config = require("config");
// const logger = require('./src/logger/pino');
// const connect = require('./src/db/mongosdb'); 
// const userRoutes = require('./src/routes/user_router'); 
// const urlRoutes = require('./src/routes/url_shot_router'); 
// const urlModel = require('./src/model/url_model')
// const cors = require('cors');
// const port = process.env.PORT || 8011;

// // const port = config.get("port");


// const app=express();
// // Middleware for CORS
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     next();
//   });

// app.get('/:shortURL',async (req, res) => {
//    const shortURL = req.params.shortURL;
//    console.log("data", shortURL)
//    try {
//        const update = await urlModel.findOneAndUpdate(
//            { 'url.shortURL': shortURL },
//            { $push: { 'url.$.pastAnalytics': { timestamp: Date.now() } } },
//            { new: true } 
//        );

//        if (!update) {
//            return res.status(404).json({ message: 'URL not found' });
//        }

//        res.redirect(update.url.find(u => u.shortURL === shortURL).originalURL);
//    } catch (error) {
//        console.error(error);
//        res.status(500).json({ message: 'Server error' });
//    }
// })

// app.use('/api/auth', userRoutes);
// app.use('/api/url_shot', urlRoutes );
// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// });
// // app.listen(port,host,()=>{
// //  logger.info(`server listen at http//${host}:${port}`);

// //  connect();
// // })
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
//     connect();
// })

const express = require('express');
const config = require("config");
const logger = require('./src/logger/pino');
const connect = require('./src/db/mongosdb'); 
const userRoutes = require('./src/routes/user_router'); 
const urlRoutes = require('./src/routes/url_shot_router'); 
const urlModel = require('./src/model/url_model');
const requestIp = require('request-ip');
const useragent = require('useragent');
const axios = require('axios');
const cors = require('cors');
const port = process.env.PORT || 8011;

const app = express();
// https://linked-mu.vercel.app
// Middleware for CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// https://x-agc4.onrender.com
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://linked-mu.vercel.app");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});
// const allowedOrigins = ['http://localhost:3000', 'https://linked-mu.vercel.app'];

// // Middleware for CORS1
// app.use((req, res, next) => {
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//         res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     next();
// });

app.get('/:shortURL', async (req, res) => {
    const shortURL = req.params.shortURL;
    logger.info(`Request received for short URL: ${shortURL}`);

    try {
        // Get the client IP address
        const clientIp = requestIp.getClientIp(req) ||
            req.headers['x-forwarded-for']?.split(',')[0] ||
            req.socket.remoteAddress;

        logger.info(`Client IP: ${clientIp}`);

        // Get geo-location data based on the client IP
        let geoLocationData = {};
        if (clientIp && clientIp !== '::1') {  // Skip local IP
            try {
                const geoLocationResponse = await axios.get(`https://ipapi.co/${clientIp}/json/`);
                geoLocationData = geoLocationResponse.data;
                logger.info(`Geo-location data: ${JSON.stringify(geoLocationData)}`);
            } catch (geoError) {
                logger.error(`Error fetching geo-location data: ${geoError.message}`);
            }
        }

        // Parse user agent from request headers
        const userAgent = useragent.parse(req.headers['user-agent']);
        logger.info(`User agent: ${JSON.stringify(userAgent)}`);

        // Update the URL document with analytics data
        const update = await urlModel.findOneAndUpdate(
            { 'url.shortURL': shortURL },
            {
                $push: {
                    'url.$.pastAnalytics': {
                        timestamp: Date.now(),
                        location: geoLocationData,
                        ip: clientIp,  // Save the client IP
                        device: {
                            browser: userAgent.family,
                            os: userAgent.os.family,
                            device: userAgent.device.family
                        }
                    }
                }
            },
            { new: true }
        );

        if (!update) {
            logger.warn(`No URL found for short URL: ${shortURL}`);
            return res.status(404).json({ message: 'URL not found' });
        }

        const originalURL = update.url.find(u => u.shortURL === shortURL).originalURL;
        logger.info(`Redirecting to original URL: ${originalURL}`);
        res.redirect(originalURL);
    } catch (error) {
        logger.error(`Server error: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
});

app.use('/api/auth', userRoutes);
app.use('/api/url_shot', urlRoutes);
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    connect();
});
