import os
import sys
import dotenv
import logging.config


def setup_logging():
    """Setup logging configuration"""
    LOGGING_CONFIG = {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "standard": {"format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s"}
        },
        "handlers": {
            "file": {
                "class": "logging.handlers.TimedRotatingFileHandler",
                "level": "INFO",
                "formatter": "standard",
                "filename": "app.log",
                "when": "midnight",
                "backupCount": 7,
                "encoding": "utf-8",
            }
        },
        "root": {"handlers": ["file"], "level": "INFO"},
    }

    logging.config.dictConfig(LOGGING_CONFIG)


def load_dotenv():
    dotenv.load_dotenv()


setup_logging()
load_dotenv()

logger = logging.getLogger(__name__)

IS_PROD = os.getenv("IS_PROD", "0") == "1"
MONGODB_URL = os.getenv("MONGODB_URL")

if IS_PROD:
    logger.info("PRODUCTION MODE")
else:
    logger.info("DEVELOPMENT MODE")