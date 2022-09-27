from os import mkdir, environ
from time import sleep
from selenium.webdriver.common.by import By
from retry import retry
from jinja2 import Environment, FileSystemLoader
from requests import get
from chrome_driver import get_chrome_driver
from weather import get_weather_icon

OPEN_WEATHER_MAP_TOKEN = environ["OPEN_WEATHER_MAP_TOKEN"]
CURRENT_DATETIME = environ["CURRENT_DATETIME"]
DYNAMIC_LIVE_CAM_LIST = [
    {"path": "c/HAKODATELIVECAMERA", "key": "hakodate", "text": "函館駅前ライブカメラ②"},
    {"path": "user/ANNnewsCH", "key": "shibuya", "text": "渋谷スクランブル交差点"},
    {
        "path": "channel/UCQJE3qm7Sjc5-JXAYjAfkrw",
        "key": "ishigaki",
        "text": "石垣島730交差点LIVEカメラ",
    },
]

INITIAL_LIVE_CAM_LIST = {
    "shiodome": {
        "id": "QOjmvL3e7Lc",
        "quality": "1080p",
        "coord": {
            "lat": "35.66104265035121",
            "lon": "139.75885344584023",
        },
    },
    "shibuya": {
        "quality": "1080p",
        "coord": {
            "lat": "35.659609121840845",
            "lon": "139.70051327515873",
        },
    },
    "sapporo": {
        "id": "kfIQBC0hrII",
        "quality": "1080p",
        "coord": {
            "lat": "43.06271540487339",
            "lon": "141.35351185556476",
        },
    },
    "hakodate": {
        "quality": "1080p",
        "query": "Hakodate",
        "coord": {
            "lat": "41.77350912153338",
            "lon": "140.7276566825039",
        },
    },
    "kariyushi": {
        "id": "fVaZnM20GVE",
        "quality": "1080p",
        "coord": {
            "lat": "26.526449685661134",
            "lon": "127.930001842358",
        },
    },
    "ishigaki": {
        "quality": "720p",
        "coord": {
            "lat": "24.33865874141486",
            "lon": "124.15795401085919",
        },
    },
    "osaka": {
        "id": "u8JsosYl51Q",
        "quality": "1080p",
        "coord": {
            "lat": "34.69587580665951",
            "lon": "135.47296632758676",
        },
    },
    "dotonbori": {
        "id": "XIonBdj9zBs",
        "quality": "720p",
        "coord": {
            "lat": "34.66924518308842",
            "lon": "135.5013102264616",
        },
    },
}


@retry(tries=3, delay=120)
def get_live_cam_list(initial_live_cam_list):
    chrome_driver = get_chrome_driver()

    for data in DYNAMIC_LIVE_CAM_LIST:
        chrome_driver.get(
            f"https://www.youtube.com/{data['path']}/videos?view=2&sort=dd&live_view=501&shelf_id=0"
        )
        sleep(3)
        found_url = chrome_driver.find_element(
            By.XPATH, f'//a[contains(text(),"{data["text"]}")]'
        ).get_attribute("href")
        target_char = "="
        idx = found_url.find(target_char)
        yt_id = found_url[idx + len(target_char) :]
        initial_live_cam_list[data["key"]]["id"] = yt_id

    for key, value in initial_live_cam_list.items():
        chrome_driver.get(
            f"https://www.youtube.com/embed/{value['id']}?rel=0&html5=1&autoplay=1"
        )
        chrome_driver.set_window_size(960, 540)
        width = chrome_driver.execute_script("return document.body.scrollWidth")
        height = chrome_driver.execute_script("return document.body.scrollHeight")
        chrome_driver.set_window_size(width, height)

        sleep(3)
        chrome_driver.find_element(By.XPATH, '//button[@aria-label="Play"]').click()

        sleep(3)
        chrome_driver.find_element(By.CLASS_NAME, "ytp-settings-button").click()

        sleep(3)
        chrome_driver.find_element(
            By.XPATH, '//div[@class="ytp-menuitem"]/div[text()="Quality"]'
        ).click()

        sleep(3)
        chrome_driver.find_element(
            By.XPATH, f'//span[contains(text(),"{value["quality"]}")]'
        ).click()

        sleep(3)
        image = f"{key}_{CURRENT_DATETIME}.png"
        chrome_driver.save_screenshot(f"assets_temp/{image}")
        value["img"] = image

        print("\n\n---------------------\n")
        print("Status : ✅")
        print(f"Name   : {key}")
        print(f"YT_ID  : {value['id']}")
        print("---------------------")
    return initial_live_cam_list


def get_weather_data(updated_cam_list):
    is_night = CURRENT_DATETIME.split("_")[1].split("-")[0] >= "18"
    for _, value in updated_cam_list.items():
        response_data = get(
            "https://api.openweathermap.org/data/2.5/weather",
            params={
                "lat": value["coord"]["lat"],
                "lon": value["coord"]["lon"],
                "appid": OPEN_WEATHER_MAP_TOKEN,
                "units": "metric",
                "lang": "ja",
            },
            timeout=(3.0, 9.0),
        ).json()
        value["temperature"] = response_data["main"]["feels_like"]
        value[
            "icon_url"
        ] = f"static/weathers/{get_weather_icon(response_data['weather'][0]['id'],is_night)}"

    return updated_cam_list


if __name__ == "__main__":
    mkdir("assets_temp")
    env = Environment(loader=FileSystemLoader("."))
    template = env.get_template("README.tpl")
    current_datetime = CURRENT_DATETIME.split("_")
    updated_date = f"{current_datetime[0].replace('-', '/')} {current_datetime[1].replace('-', ':')}"
    live_cam_list = get_live_cam_list(INITIAL_LIVE_CAM_LIST)
    updated_list = get_weather_data(live_cam_list)

    with open("README.md", "w", encoding="utf-8") as file:
        file.write(
            template.render(
                live_cam_list=updated_list,
                updated_date=updated_date,
            )
        )
