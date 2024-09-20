import os
import dotenv
import logging.config
from fastapi.openapi.utils import get_openapi


def setup_logging():
    """Setup logging configuration"""
    log_filename_path = "logs/api.log"
    if not os.path.exists(os.path.dirname(log_filename_path)):
        os.makedirs(os.path.dirname(log_filename_path))

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
                "filename": log_filename_path,
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


def custom_openapi(app):
    openapi_schema = get_openapi(title="API", version="1.0", routes=app.routes)
    app.openapi_schema = openapi_schema
    return app.openapi_schema

def check_status():

    logger = logging.getLogger(__name__)

    if IS_PROD:
        logger.info("PRODUCTION MODE")
    else:
        logger.info("DEVELOPMENT MODE")
           
IS_PROD = os.getenv("IS_PROD", "0") == "1"
MONGODB_URL = os.getenv("MONGODB_URL")
CLERK_PEM_PUBLIC_KEY = None
if IS_PROD:
    with open("clerk.prod.pem", "rb") as pem_file:
        CLERK_PEM_PUBLIC_KEY = pem_file.read()
else:
    with open("clerk.dev.pem", "rb") as pem_file:
        CLERK_PEM_PUBLIC_KEY = pem_file.read()
