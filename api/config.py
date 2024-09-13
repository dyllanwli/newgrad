import os
import sys
import logging


def setup_sqlite3():
    try:
        import pysqlite3

        sys.modules["sqlite3"] = sys.modules.pop("pysqlite3")
    except ImportError:
        pass


def setup_logger():
    logger = logging.getLogger("app")
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(
        logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    )
    logger.handlers = [handler]
    logger.setLevel(logging.INFO)
    return logger


logger = setup_logger()

IS_PROD = os.getenv("IS_PROD", "0") == "1"

if IS_PROD:
    logger.info("PRODUCTION MODE")
else:
    logger.info("DEVELOPMENT MODE")
