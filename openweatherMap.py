# https://openweathermap.org/weather-conditions
# https://bas.dev/work/meteocons
# https://wisteriahill.sakura.ne.jp/CMS/WordPress/2018/03/05/openweathermap-term-table/


def get_weather_icon(weather_id, is_night=False):
    match weather_id:
        case 200 | 230:
            return "thunderstorms-rain.svg"
        case 201 | 231:
            return "thunderstorms-overcast-rain.svg"
        case 202 | 232:
            return "thunderstorms-extreme-rain.svg"
        case 210:
            return "thunderstorms.svg"
        case 211:
            return "thunderstorms-overcast.svg"
        case 212:
            return "thunderstorms-extreme.svg"
        case 221:
            return "thunderstorms-night.svg" if is_night else "thunderstorms-day.svg"
        case 300 | 310 | 313:
            return "drizzle.svg"
        case 301 | 311 | 314:
            return "overcast-drizzle.svg"
        case 302 | 312 | 321:
            return "extreme-drizzle.svg"
        case 500 | 520 | 521 | 522:
            return "rain.svg"
        case 501:
            return "overcast-rain.svg"
        case 502 | 503 | 504:
            return "extreme-rain.svg"
        case 511 | 611 | 615:
            return "sleet.svg"
        case 531 | 771:
            return (
                "partly-cloudy-night-rain.svg"
                if is_night
                else "partly-cloudy-day-rain.svg"
            )
        case 600:
            return "snow.svg"
        case 601 | 621:
            return "overcast-snow.svg"
        case 602 | 622:
            return "extreme-snow.svg"
        case 612 | 616:
            return "overcast-sleet.svg"
        case 613 | 620:
            return "extreme-sleet.svg"
        case 701:
            return "haze-night.svg" if is_night else "haze-day.svg"
        case 711 | 721 | 741:
            return "fog-night.svg" if is_night else "fog-day.svg"
        case 731 | 751 | 761 | 762:
            return "dust-night.svg" if is_night else "dust-day.svg"
        case 781:
            return "tornado.svg"
        case 800:
            return "clear-night.svg" if is_night else "clear-day.svg"
        case 801:
            return "partly-cloudy-night.svg" if is_night else "partly-cloudy-day.svg"
        case 802:
            return "cloudy.svg"
        case 803:
            return "overcast.svg"
        case 804:
            return "extreme.svg"
        case _:
            return "not-available.svg"
