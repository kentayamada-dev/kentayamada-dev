from time import sleep
from os import mkdir, environ
from requests_html import HTMLSession
from selenium.webdriver.common.by import By
from tenacity import retry, wait_fixed, stop_after_attempt
from jinja2 import Environment, FileSystemLoader
from chrome_driver import get_chrome_driver
from my_logger import MyLogger

CURRENT_DATETIME = environ["CURRENT_DATETIME"]

my_logger = MyLogger()


@retry(stop=stop_after_attempt(5), wait=wait_fixed(1))
def get_yt_id(path, title, city_name):
    logger = my_logger.get_logger()
    log = f"City : {city_name}" f"\nText : {title}" f"\nPath : {path}"

    try:
        response = HTMLSession().get(
            f"https://www.youtube.com/{path}/videos?view=2&live_view=501"
        )
        response.html.render(sleep=1)
        url = next(
            iter(
                response.html.find("a#video-title", containing=title, first=True).links
            )
        )
        target_char = "="
        idx = url.find(target_char)
        yt_id = url[idx + len(target_char) :]

        logger.error(log)
    except Exception as exc:
        logger.critical(log)
        raise exc

    return yt_id


@retry(stop=stop_after_attempt(5), wait=wait_fixed(1))
def get_weather_data(key, loc):
    logger = my_logger.get_logger()
    log = f"Key : {key}" f"\nLoc : {loc}"

    try:
        response = HTMLSession().get(f"https://www.google.com/search?q={loc}+天気")
        response.html.render(sleep=1)
        find = response.html.find
        temperature = round((int(find("span#wob_tm", first=True).text) - 32) / 1.8)
        icon_url = f'https:{find("img#wob_tci", first=True).attrs["src"]}'
        humidity = find("span#wob_hm", first=True).text
        ms_wind = round(
            int(find("span#wob_ws", first=True).text.split(" ")[0]) * 0.44704
        )
        wind = f"{ms_wind}m/s"

        logger.error(log)
    except Exception as exc:
        logger.critical(log)
        raise exc

    return temperature, icon_url, humidity, wind


@retry(stop=stop_after_attempt(5), wait=wait_fixed(3))
def save_yt_image(yt_id, quality, city_name):
    logger = my_logger.get_logger()
    driver = get_chrome_driver()
    log = f"City  : {city_name}" f"\nYT ID : {yt_id}"

    try:
        driver.get(f"https://www.youtube.com/embed/{yt_id}?rel=0&html5=1&autoplay=1")
        driver.set_window_size(960, 540)
        width = driver.execute_script("return document.body.scrollWidth")
        height = driver.execute_script("return document.body.scrollHeight")
        driver.set_window_size(width, height)

        sleep(3)
        driver.find_element(By.XPATH, '//button[@aria-label="Play"]').click()

        sleep(3)
        driver.find_element(By.CLASS_NAME, "ytp-settings-button").click()

        sleep(3)
        driver.find_element(
            By.XPATH, '//div[@class="ytp-menuitem"]/div[text()="Quality"]'
        ).click()

        sleep(3)
        driver.find_element(By.XPATH, f'//span[contains(text(),"{quality}p")]').click()

        sleep(3)
        image = f"{city_name}_{CURRENT_DATETIME}.png"
        driver.save_screenshot(f"assets_temp/{image}")

        logger.error(log)
    except Exception as exc:
        logger.critical(log)
        raise exc

    return image


def get_live_cam_list():
    initial_list = {
        "hokkaido": {
            "weather": {
                "loc": "北海道",
            },
            "cities": {
                "sapporo": {
                    "yt": {
                        "quality": "1080",
                        "path": "c/TVh7chHokkaido",
                        "title": "ライブストリーム",
                    }
                },
                "hakodate": {
                    "yt": {
                        "quality": "1080",
                        "path": "c/HAKODATELIVECAMERA",
                        "title": "ライブカメラ②",
                    }
                },
            },
        },
        "tokyo": {
            "weather": {
                "loc": "東京都",
            },
            "cities": {
                "odaiba": {
                    "yt": {
                        "quality": "1080",
                        "path": "c/ちんあなご",
                        "title": "レインボーブリッジと東京タワー",
                    }
                },
                "shibuya": {
                    "yt": {
                        "quality": "1080",
                        "path": "user/ANNnewsCH",
                        "title": "ライブカメラ",
                    }
                },
            },
        },
        "okinawa": {
            "weather": {
                "loc": "沖縄県",
            },
            "cities": {
                "kariyushi": {
                    "yt": {
                        "quality": "1080",
                        "path": "user/kariyushihotels",
                        "title": "かりゆしプライベートビーチ",
                    },
                },
                "ishigaki": {
                    "yt": {
                        "quality": "720",
                        "path": "channel/UCQJE3qm7Sjc5-JXAYjAfkrw",
                        "title": "石垣島730交差点LIVEカメラ",
                    }
                },
            },
        },
        "osaka": {
            "weather": {
                "loc": "大阪府",
            },
            "cities": {
                "osaka": {
                    "yt": {
                        "quality": "1080",
                        "path": "channel/UCRruWUK0POjg2veibHucffQ",
                        "title": "大阪ライブカメラ",
                    }
                },
                "dotonbori": {
                    "yt": {
                        "quality": "720",
                        "path": "user/RVJplanet",
                        "title": "大阪道頓堀ライブカメラ",
                    }
                },
            },
        },
    }

    for prefectures, obj in initial_list.items():
        weather = obj["weather"]
        (
            weather["temperature"],
            weather["icon_url"],
            weather["humidity"],
            weather["wind"],
        ) = get_weather_data(prefectures, weather["loc"])

        for city_name, city in obj["cities"].items():
            yt_obj = city["yt"]
            yt_id = get_yt_id(yt_obj["path"], yt_obj["title"], city_name)
            yt_obj["img"] = save_yt_image(yt_id, yt_obj["quality"], city_name)

    return initial_list


if __name__ == "__main__":
    mkdir("assets_temp")
    env = Environment(loader=FileSystemLoader("."))
    template = env.get_template("README.tpl")
    current_datetime = CURRENT_DATETIME.split("_")
    updated_date = f"{current_datetime[0].replace('-', '/')} {current_datetime[1].replace('-', ':')}"
    live_cam_list = get_live_cam_list()

    with open("README.md", "w", encoding="utf-8") as file:
        file.write(
            template.render(
                live_cam_list=live_cam_list,
                updated_date=updated_date,
            )
        )
