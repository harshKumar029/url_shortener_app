require('dotenv').config();
const mongodburl = process.env.MONGODB_URL
// const port = process.env.port;
// const host = process.env.host;
const saltWorkFactorString = process.env.saltWorkFactor;
const saltWorkFactor = saltWorkFactorString ? parseInt(saltWorkFactorString, 10) :console.log("facing error");
const secret_key=process.env.secret_key;


module.exports = {
    mongodburl,
    // port,
    // host,
    saltWorkFactor,
    secret_key,
};