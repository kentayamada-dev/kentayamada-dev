import inspect
import logging
import os
from typing import Any


class CustomLogger:
    def __init__(self) -> None:
        self.logger = logging.getLogger(__name__)
        self.ch = logging.StreamHandler()
        if os.getenv("DEBUG") == "true":
            self.logger.setLevel(logging.DEBUG)

    @staticmethod
    def __set_formatter(handler: Any, log_level: Any) -> None:  # noqa: ANN401
        colors = {
            logging.DEBUG: "\033[94m",  # Blue for DEBUG
            logging.INFO: "\033[92m",  # Green for INFO
            logging.WARNING: "\033[93m",  # Yellow for WARNING
            logging.ERROR: "\033[91m",  # Red for ERROR
            logging.CRITICAL: "\033[95m",  # Magenta for CRITICAL
        }
        color = colors.get(log_level, "\033[0m")
        formatter = logging.Formatter(f"{color}%(asctime)s - %(message)s\033[0m", "%Y-%m-%d %H:%M:%S")
        handler.setFormatter(formatter)

    def __log(self, message: str, level: int) -> None:
        self.ch.setLevel(level)
        self.__set_formatter(self.ch, level)
        self.logger.addHandler(self.ch)
        self.logger.log(level, message)

    def debug(self, message: Any) -> None:  # noqa: ANN401
        caller_frame = inspect.getouterframes(inspect.currentframe())[1]
        filename = caller_frame.filename
        lineno = caller_frame.lineno
        formatted_message = f"{filename}:{lineno}\n\033[0m{message}"
        self.__log(formatted_message, logging.DEBUG)

    def info(self, message: Any) -> None:  # noqa: ANN401
        caller_frame = inspect.getouterframes(inspect.currentframe())[1]
        filename = caller_frame.filename
        lineno = caller_frame.lineno
        formatted_message = f"{filename}:{lineno}\n\033[0m{message}"
        self.__log(formatted_message, logging.INFO)

    def warning(self, message: Any) -> None:  # noqa: ANN401
        caller_frame = inspect.getouterframes(inspect.currentframe())[1]
        filename = caller_frame.filename
        lineno = caller_frame.lineno
        formatted_message = f"{filename}:{lineno}\n\033[0m{message}"
        self.__log(formatted_message, logging.WARNING)

    def error(self, message: Any) -> None:  # noqa: ANN401
        caller_frame = inspect.getouterframes(inspect.currentframe())[1]
        filename = caller_frame.filename
        lineno = caller_frame.lineno
        formatted_message = f"{filename}:{lineno}\n\033[0m{message}"
        self.__log(formatted_message, logging.ERROR)

    def critical(self, message: Any) -> None:  # noqa: ANN401
        caller_frame = inspect.getouterframes(inspect.currentframe())[1]
        filename = caller_frame.filename
        lineno = caller_frame.lineno
        formatted_message = f"{filename}:{lineno}\n\033[0m{message}"
        self.__log(formatted_message, logging.CRITICAL)
