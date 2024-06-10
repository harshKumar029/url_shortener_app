// const pino = require("pino");

// const logger = pino({
//     transport:{
//         target: "pino-pretty",
//         options:{
//             translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
//             IGNORE:"paid,hostname",
//         }
//     }
//   });

//   module.exports = logger;


// const pino = require("pino");
// const pinoPretty = require("pino-pretty");

// const logger = pino({
//     prettifier: pinoPretty, // Use pino-pretty for formatting logs in development
//     level: process.env.NODE_ENV === 'production' ? 'info' : 'debug' // Set log level based on environment
// });

// module.exports = logger;

const pino = require("pino");

const logger = pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug', // Set log level based on environment
    transport: process.env.NODE_ENV !== 'production' ? {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    } : undefined
});

module.exports = logger;

