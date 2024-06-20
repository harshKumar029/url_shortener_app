const pino = require("pino");

const logger = pino({
    transport:{
        target: "pino-pretty",
        options:{
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            IGNORE:"paid,hostname",
        }
    }
  });

  module.exports = logger;