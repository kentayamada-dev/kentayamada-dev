from inspect import currentframe
from os.path import basename
from logging import getLogger
from datetime import datetime
from pytz import timezone
import coloredlogs


class MyLogger:
    def __convert_time(self, _):
        return datetime.now(timezone("Asia/Tokyo")).timetuple()

    def get_logger(self):
        frame = currentframe().f_back
        file_name = basename(frame.f_code.co_filename)
        func_name = frame.f_code.co_name
        logger = getLogger()
        coloredlogs.install(
            level="DEBUG",  # CRITICAL, ERROR, WARNING, INFO, DEBUG
            logger=logger,
            fmt=f"\n[%(asctime)s] {file_name} > {func_name}:\n%(message)s",
            datefmt="%Y/%m/%d %H:%M:%S",
        )
        coloredlogs.converter = self.__convert_time

        return logger
