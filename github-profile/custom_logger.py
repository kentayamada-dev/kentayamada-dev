import inspect
import logging
import os
from typing import Any


class CustomLogger:
    def __init__(self) -> None:
        self.logger = logging.getLogger(__name__)
        self.ch = logging.StreamHandler()
        self.logger.setLevel(logging.DEBUG)
        self.logger.disabled = os.getenv("DEBUG") != "true"

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
        stack = inspect.stack()
        for frame_info in stack:
            if inspect.getmodule(frame_info[0]).__name__ != __name__:  # type: ignore  # noqa: PGH003
                caller_frame = frame_info
                break
        filename = caller_frame.filename  # type: ignore  # noqa: PGH003
        lineno = caller_frame.lineno  # type: ignore  # noqa: PGH003
        formatted_message = f"{filename}:{lineno}\n\033[0m{message}"
        self.logger.log(level, formatted_message)

    def debug(self, message: Any) -> None:  # noqa: ANN401
        self.__log(message, logging.DEBUG)

    def info(self, message: Any) -> None:  # noqa: ANN401
        self.__log(message, logging.INFO)

    def warning(self, message: Any) -> None:  # noqa: ANN401
        self.__log(message, logging.WARNING)

    def error(self, message: Any) -> None:  # noqa: ANN401
        self.__log(message, logging.ERROR)

    def critical(self, message: Any) -> None:  # noqa: ANN401
        self.__log(message, logging.CRITICAL)
