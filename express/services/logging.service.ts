import winston from "winston";

const logger = winston.createLogger({});
logger.add(new winston.transports.Console());

export default logger;
