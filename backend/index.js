const express = require('express');
const config = require("config");
const logger = require('./src/logger/pino');
const connect = require('./src/db/mongosdb'); 
const userRoutes = require('./src/routes/user_router'); 
const urlRoutes = require('./src/routes/url_shot_router'); 
const urlModel = require('./src/model/url_model')
const cors = require('cors');
const port = process.env.PORT || 8011;

// const port = config.get("port");


const app=express();
// Middleware for CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://linked-mu.vercel.app/");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });

app.get('/:shortURL',async (req, res) => {
   const shortURL = req.params.shortURL;
   console.log("data", shortURL)
   try {
       const update = await urlModel.findOneAndUpdate(
           { 'url.shortURL': shortURL },
           { $push: { 'url.$.pastAnalytics': { timestamp: Date.now() } } },
           { new: true } 
       );

       if (!update) {
           return res.status(404).json({ message: 'URL not found' });
       }

       res.redirect(update.url.find(u => u.shortURL === shortURL).originalURL);
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: 'Server error' });
   }
})
app.use('/api/auth', userRoutes);
app.use('/api/url_shot', urlRoutes );
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
// app.listen(port,host,()=>{
//  logger.info(`server listen at http//${host}:${port}`);

//  connect();
// })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    connect();
})