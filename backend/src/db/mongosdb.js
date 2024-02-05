const mongoose = require("mongoose");
const config = require("config");
const logger = require("../logger/pino");

const connect = async () => {
  const mongodburl = config.get("mongodburl");

  return await mongoose.connect(mongodburl)
    .then(() => {
        logger.info("Database connected");
    })
    .catch((error) => {
        logger.error("db error", error);
      process.exit(1);
    });
};

module.exports = connect;
