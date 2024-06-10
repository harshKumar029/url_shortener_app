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

// require('dotenv').config();

// const mongodbUrl = process.env.MONGODB_URL;
// const saltWorkFactorString = process.env.SALT_WORK_FACTOR;
// const secretKey = process.env.SECRET_KEY;

// if (!mongodbUrl) {
//     throw new Error('MONGODB_URL environment variable is missing.');
// }

// if (!saltWorkFactorString) {
//     throw new Error('SALT_WORK_FACTOR environment variable is missing.');
// }

// const saltWorkFactor = parseInt(saltWorkFactorString, 10);
// if (isNaN(saltWorkFactor)) {
//     throw new Error('SALT_WORK_FACTOR must be a valid number.');
// }

// if (!secretKey) {
//     throw new Error('SECRET_KEY environment variable is missing.');
// }

// module.exports = {
//     mongodbUrl,
//     saltWorkFactor,
//     secretKey
// };
