import winston from "winston";
import "winston-daily-rotate-file";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const { combine, timestamp, printf, colorize, errors } = winston.format;

const terminalFormat = printf((info) => {
  return `[${info.timestamp}], [${info.level}], ${info.message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
    errors({ stack: true })
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: "logs/%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      format: terminalFormat,
    }),
    new winston.transports.Console({
      format: combine(colorize({ all: true }), terminalFormat),
    }),
  ],
});

export default logger;