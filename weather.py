from os import environ
from requests_html import HTMLSession
from my_logger import MyLogger


class Weather:
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
    def __extract_value(data_list, suffix):
        return next((item.replace(suffix, "") for item in data_list if item.endswith(suffix)), None)

    @classmethod
    def get_weather_data(cls, query: str):
        my_logger = MyLogger().get_logger()
        url = f"https://weathernews.jp/onebox/{query}"
        response = HTMLSession().get(url)
        find = response.html.find  # type: ignore
        data = find('div.nowWeather', first=True).text.split()
        temperature = cls.__extract_value(data,'℃'))
        weather = data[0]
        humidity = cls.__extract_value(data,'%'))
        wind = cls.__extract_value(data,'m/s'))
        wind_direction = data[13]
        is_night = environ["CURRENT_DATETIME"].split("_")[1].split("-")[0] >= "18"
        icon = cls.__get_weather_icon(weather, is_night)

        log = f"{temperature}\n{weather}\n{humidity}\n{wind}\n{wind_direction}"
        my_logger.error(log)

        return (temperature, icon, humidity, wind_direction, wind, url)
