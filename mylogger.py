from inspect import currentframe
from os.path import basename
from logging import getLogger, DEBUG, StreamHandler, Formatter
from datetime import datetime
from pytz import timezone


class MyLogger:
    def __convert_time(self, _):
        return datetime.now(timezone("Asia/Tokyo")).timetuple()

    def get_logger(self):
        frame = currentframe().f_back
        file_name = basename(frame.f_code.co_filename)
        func_name = frame.f_code.co_name
        logger = getLogger()
        logger.setLevel(DEBUG)
        stream_handler = StreamHandler()
        stream_handler.setLevel(DEBUG)
        formatter = Formatter(
            fmt=f"\n[%(asctime)s] {file_name} > {func_name}:\n%(message)s",
            datefmt="%Y/%m/%d %H:%M:%S",
        )
        formatter.converter = self.__convert_time
        stream_handler.setFormatter(formatter)
        logger.addHandler(stream_handler)

        return logger
