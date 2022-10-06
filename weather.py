from re import findall
from os import environ
from requests_html import HTMLSession
from my_logger import MyLogger


class Weather:
    def __init__(self):
        self.my_logger = MyLogger().get_logger()

    # https://bas.dev/work/meteocons
    @staticmethod
    def __get_weather_icon(weather_condition: str, is_night: bool = False):
        match weather_condition:
            case "晴れ":
                return "clear-night.svg" if is_night is True else "clear-day.svg"
            case "くもり":
                return "overcast.svg"
            case "うすぐもり":
                return (
                    "partly-cloudy-night.svg"
                    if is_night is True
                    else "partly-cloudy-day.svg"
                )
            case "雨":
                return "overcast-rain.svg"
            case "雪":
                return "overcast-snow.svg"
            case "小雨":
                return "overcast-drizzle.svg"
            case "みぞれ":
                return "overcast-hail.svg"
            case "猛暑":
                return "sun-hot.svg"
            case "大雨・嵐":
                return "extreme-rain.svg"
            case "大雪・吹雪":
                return "extreme-snow.svg"
            case _:
                return "not-available.svg"

    @staticmethod
    def __extract_number(string: str):
        nums = findall(r"\d+", string)

        return nums[0] if isinstance(nums, list) else ""

    def get_weather_data(self, query: str):
        response = HTMLSession().get(f"https://weathernews.jp/onebox/{query}")
        find = response.html.find  # type: ignore
        data = find("ul.weather-now__ul>li")
        raw_temperature = data[1].text
        raw_weather = data[0].text
        raw_humidity = data[2].text
        raw_wind = data[4].text
        temperature = self.__extract_number(raw_temperature.replace("気温", ""))
        is_night = environ["CURRENT_DATETIME"].split("_")[1].split("-")[0] >= "18"
        icon = self.__get_weather_icon(raw_weather.replace("天気", ""), is_night)
        humidity = self.__extract_number(raw_humidity.replace("湿度", ""))
        wind_direction, wind_ms = raw_wind.replace("風　", "").split()
        wind = self.__extract_number(wind_ms)

        log = f"{raw_temperature}\n{raw_weather}\n{raw_humidity}\n{raw_wind}"
        self.my_logger.error(log)

        return (
            temperature,
            icon,
            humidity,
            wind_direction,
            wind,
        )
