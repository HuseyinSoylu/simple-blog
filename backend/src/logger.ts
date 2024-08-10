import { createLogger, format, transports } from "winston";

const logFormat = format.printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/app.log", level: "info" }),
    new transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

export default logger;
