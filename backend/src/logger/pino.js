const pino = require("pino");

const logger = pino({
    prettyPrint: {
        translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
        ignore: "paid,hostname" // Excluding specific fields from the logs
    }
});

module.exports = logger;
