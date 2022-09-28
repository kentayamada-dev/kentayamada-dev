from inspect import currentframe
from os.path import basename
from logging import (
    Formatter,
    ERROR,
    CRITICAL,
    StreamHandler,
    getLogger,
)
from datetime import datetime
from pytz import timezone


class MyLogger:
    class MyFormatter(Formatter):
        red = "\033[0;31m"
        green = "\033[0;32m"
        end = "\033[0m"
        info = "[%(asctime)s(JST)] %(filename)s > %(funcName)s:"
        message = "\n%(message)s"

        fmt = {
            # DEBUG: grey + fmt + reset,
            # INFO: grey + fmt + reset,
            # WARNING: yellow + fmt + reset,
            ERROR: f"\n\n{green}{info}{end}{message}",
            CRITICAL: f"\n\n{red}{info}{end}{message}",
        }

        def __convert_time(self, _):
            return datetime.now(timezone("Asia/Tokyo")).timetuple()

        def format(self, record):
            formatter = Formatter(
                self.fmt.get(record.levelno),
                datefmt="%Y/%m/%d %H:%M:%S",
            )
            formatter.converter = self.__convert_time
            return formatter.format(record)

    frame = currentframe().f_back
    file_name = basename(frame.f_code.co_filename)
    func_name = frame.f_code.co_name

    def get_logger(self):
        logger = getLogger()
        logger.setLevel(ERROR)
        stream_handler = StreamHandler()
        stream_handler.setLevel(ERROR)
        stream_handler.setFormatter(self.MyFormatter())
        logger.addHandler(stream_handler)

        return logger
