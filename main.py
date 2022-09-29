from time import sleep
from os import mkdir, environ
from requests_html import HTMLSession
from selenium.webdriver.common.by import By
from tenacity import retry, wait_fixed, stop_after_attempt
from jinja2 import Environment, FileSystemLoader
from chrome_driver import get_chrome_driver
from my_logger import MyLogger

CURRENT_DATETIME = environ["CURRENT_DATETIME"]


@retry(stop=stop_after_attempt(3), wait=wait_fixed(60))
def get_yt_id(get_yt_id_logger):
    logger = get_yt_id_logger.get_logger()
    dynamic_live_cam_list = [
        {"path": "c/HAKODATELIVECAMERA", "key": "hakodate", "text": "函館駅前ライブカメラ②"},
        {
            "path": "channel/UCRruWUK0POjg2veibHucffQ",
            "key": "osaka",
            "text": "大阪ライブカメラ",
        },
        {"path": "user/ANNnewsCH", "key": "shibuya", "text": "渋谷スクランブル交差点"},
        {
            "path": "channel/UCQJE3qm7Sjc5-JXAYjAfkrw",
            "key": "ishigaki",
            "text": "石垣島730交差点LIVEカメラ",
        },
    ]
    initial_list = {
        "odaiba": {
            "id": "mfliIqaZddU",
            "quality": "720p",
            "weather": {
                "loc": "東京都港区台場",
            },
        },
        "shibuya": {
            "quality": "1080p",
            "weather": {
                "loc": "東京都渋谷区道玄坂",
            },
        },
        "sapporo": {
            "id": "kfIQBC0hrII",
            "quality": "1080p",
            "weather": {
                "loc": "北海道札幌市中央区北１条西",
            },
        },
        "hakodate": {
            "quality": "1080p",
            "query": "Hakodate",
            "weather": {
                "loc": "北海道函館市若松町",
            },
        },
        "kariyushi": {
            "id": "fVaZnM20GVE",
            "quality": "1080p",
            "weather": {
                "loc": "沖縄県恩納村名嘉真",
            },
        },
        "ishigaki": {
            "quality": "720p",
            "weather": {
                "loc": "沖縄県石垣市大川",
            },
        },
        "osaka": {
            "quality": "1080p",
            "weather": {
                "loc": "大阪府大阪市福島区",
            },
        },
        "dotonbori": {
            "id": "XIonBdj9zBs",
            "quality": "720p",
            "weather": {
                "loc": "大阪府大阪市中央区道頓堀",
            },
        },
    }

    for data in dynamic_live_cam_list:
        log = (
            f"Key  : {data['key']}"
            f"\nText : {data['text']}"
            f"\nPath : {data['path']}"
        )

        try:
            response = HTMLSession().get(
                f"https://www.youtube.com/{data['path']}/videos?view=2&sort=dd&live_view=501&shelf_id=0"
            )
            response.html.render()
            found_url = next(
                iter(
                    response.html.find(
                        "a#video-title", containing=data["text"], first=True
                    ).links
                )
            )
            target_char = "="
            idx = found_url.find(target_char)
            yt_id = found_url[idx + len(target_char) :]
            initial_list[data["key"]]["id"] = yt_id

            logger.error(log)
        except Exception as exc:
            logger.critical(log)
            raise exc

    return initial_list


@retry(stop=stop_after_attempt(3), wait=wait_fixed(60))
def get_live_cam_list(live_cam_logger, initial_live_cam_list):
    logger = live_cam_logger.get_logger()
    chrome_driver, user_agent = get_chrome_driver()

    for key, value in initial_live_cam_list.items():
        log = f"UA    : {user_agent}" f"\nKey   : {key}" f"\nYT ID : {value['id']}"

        try:
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

            logger.error(log)
        except Exception as exc:
            logger.critical(log)
            raise exc

    return initial_live_cam_list


@retry(stop=stop_after_attempt(5), wait=wait_fixed(60))
def get_weather_data(weather_logger, updated_cam_list):
    logger = weather_logger.get_logger()

    for key, value in updated_cam_list.items():
        log = f"Key : {key}" f"\nLoc : {value['weather']['loc']}"

        try:
            response = HTMLSession().get(
                f"https://www.google.com/search?q={value['weather']['loc']}+天気"
            )
            response.html.render()
            find = response.html.find
            value["temperature"] = round(
                (int(find("span#wob_tm", first=True).text) - 32) / 1.8
            )
            value[
                "icon_url"
            ] = f'https://{find("img#wob_tci", first=True).attrs["src"]}'
            value["humidity"] = find("span#wob_hm", first=True).text
            ms_wind = round(
                int(find("span#wob_ws", first=True).text.split(" ")[0]) * 0.44704
            )
            value["wind"] = f"{ms_wind}m/s"

            logger.error(log)
        except Exception as exc:
            logger.critical(log)
            raise exc

    return updated_cam_list


if __name__ == "__main__":
    my_logger = MyLogger()
    mkdir("assets_temp")
    env = Environment(loader=FileSystemLoader("."))
    template = env.get_template("README.tpl")
    current_datetime = CURRENT_DATETIME.split("_")
    updated_date = f"{current_datetime[0].replace('-', '/')} {current_datetime[1].replace('-', ':')}"
    live_cam_list = get_weather_data(
        my_logger,
        get_live_cam_list(my_logger, get_yt_id(my_logger)),
    )

    with open("README.md", "w", encoding="utf-8") as file:
        file.write(
            template.render(
                live_cam_list=live_cam_list,
                updated_date=updated_date,
            )
        )
