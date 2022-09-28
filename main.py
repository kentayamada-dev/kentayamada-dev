from re import findall
from os import mkdir
from time import sleep
from random import randrange
from selenium.webdriver.common.by import By
from tenacity import retry, wait_fixed, stop_after_attempt
from jinja2 import Environment, FileSystemLoader
from requests import get
from bs4 import BeautifulSoup
from chrome_driver import get_chrome_driver
from constants import (
    CURRENT_DATETIME,
    DYNAMIC_LIVE_CAM_LIST,
    STATIC_LIVE_CAM_LIST,
    USER_AGENT_LISTS,
)
from my_logger import MyLogger


@retry(stop=stop_after_attempt(3), wait=wait_fixed(60))
def get_yt_id(get_yt_id_logger, initial_list):
    logger = get_yt_id_logger.get_logger()
    chrome_driver, user_agent = get_chrome_driver()

    for data in DYNAMIC_LIVE_CAM_LIST:
        log = (
            f"UA   : {user_agent}"
            f"\nKey  : {data['key']}"
            f"\nText : {data['text']}"
            f"\nPath : {data['path']}"
        )

        try:
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
    user_agent = USER_AGENT_LISTS[randrange(0, len(USER_AGENT_LISTS), 1)]

    for key, value in updated_cam_list.items():
        log = (
            f"UA  : {user_agent}" f"\nKey : {key}" f"\nLoc : {value['weather']['loc']}"
        )

        try:
            url = f"https://www.google.com/search?q={value['weather']['loc']}+天気"
            response = get(
                url=url, headers={"User-Agent": user_agent}, timeout=(3.0, 9.0)
            )
            sleep(3)
            soup = BeautifulSoup(response.text, "html5lib")
            now = soup.find("img", attrs={"id": "wob_tci"})
            value["temperature"] = round(
                (int(soup.find("span", attrs={"id": "wob_tm"}).text) - 32) / 1.8
            )
            value["icon_url"] = "https://" + findall(r"src=\"//(.*?)\"", str(now))[0]
            value["humidity"] = soup.find("span", attrs={"id": "wob_hm"}).text
            ms_wind = round(
                int(soup.find("span", attrs={"id": "wob_ws"}).text.split(" ")[0])
                * 0.44704
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
        get_live_cam_list(my_logger, get_yt_id(my_logger, STATIC_LIVE_CAM_LIST)),
    )

    with open("README.md", "w", encoding="utf-8") as file:
        file.write(
            template.render(
                live_cam_list=live_cam_list,
                updated_date=updated_date,
            )
        )
