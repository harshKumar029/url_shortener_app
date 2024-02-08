const mongoose = require("mongoose");
const config = require("config");
const logger = require("../logger/pino");

const connect = async () => {
  // const mongodburl = config.get("mongodburl");
  const mongodburl = process.env.MONGODB_URL;

  return await mongoose.connect(mongodburl)
    .then(() => {
        logger.info("Database connected");
    })
    .catch((error) => {
      logger.error("db error:", error.message);
      process.exit(1);
    });
};

module.exports = connect;
