from re import search
from os import environ
from requests_html import HTMLSession


class Weather:
    # https://bas.dev/work/meteocons
    @staticmethod
    def __get_weather_icon(weather_condition: str, is_night: bool = False):
        match weather_condition:
            case "晴れ":
                return "clear-night.svg" if is_night is True else "clear-day.svg"
            case "くもり":
                return "overcast.svg"
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
        return search(r"\d+", string)[0]

    @classmethod
    def get_weather_data(cls, query: str):
        response = HTMLSession().get(f"https://www.jp-weathernews.com/v/wl/{query}")
        find = response.html.find
        data = find("ul.weather-now__ul>li")
        temperature = cls.__extract_number(data[1].text.replace("気温", ""))
        is_night = environ["CURRENT_DATETIME"].split("_")[1].split("-")[0] >= "18"
        icon = cls.__get_weather_icon(data[0].text.replace("天気", ""), is_night)
        humidity = cls.__extract_number(data[2].text.replace("湿度", ""))
        wind_direction, wind_ms = data[4].text.replace("風　", "").split()
        wind = cls.__extract_number(wind_ms)

        return (
            temperature,
            icon,
            humidity,
            wind_direction,
            wind,
        )
