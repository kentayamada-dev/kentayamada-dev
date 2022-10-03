from requests_html import HTMLSession


class Google:
    GOOGLE_URL = "https://www.google.com"

    @classmethod
    def get_weather_data(cls, place_name: str):
        response = HTMLSession().get(f"{cls.GOOGLE_URL}/search?q={place_name}+Weather")
        find = response.html.find
        temperature = round((int(find("span#wob_tm", first=True).text) - 32) / 1.8)
        weather_icon_url = f'https:{find("img#wob_tci", first=True).attrs["src"]}'
        humidity = find("span#wob_hm", first=True).text
        wind_ms = int(find("span#wob_ws", first=True).text.split(" ")[0])

        return temperature, weather_icon_url, humidity, wind_ms
