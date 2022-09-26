from os import mkdir, environ
from time import sleep
from selenium.webdriver.common.by import By
from retry import retry
from jinja2 import Environment, FileSystemLoader
from chrome_driver import get_chrome_driver


CURRENT_DATETIME = environ["CURRENT_DATETIME"]
DYNAMIC_LIVE_CAM_LIST = [
    {"path": "c/HAKODATELIVECAMERA", "key": "hakodate", "text": "函館駅前ライブカメラ①"},
    {
        "path": "channel/UCQJE3qm7Sjc5-JXAYjAfkrw",
        "key": "ishigaki",
        "text": "石垣島730交差点LIVEカメラ",
    },
]


@retry(tries=3, delay=60)
def get_live_cam_list():
    initial_live_cam_list = {
        "shiodome": {"id": "QOjmvL3e7Lc", "quality": "1080p"},
        "shibuya": {"id": "3kPH7kTphnE", "quality": "1080p"},
        "sapporo": {"id": "kfIQBC0hrII", "quality": "1080p"},
        "hakodate": {"quality": "1080p"},
        "naha": {"id": "6HYjCFkmDPA", "quality": "1080p"},
        "ishigaki": {"quality": "720p"},
        "osaka": {"id": "u8JsosYl51Q", "quality": "1080p"},
        "dotonbori": {"id": "XIonBdj9zBs", "quality": "720p"},
    }
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
                ishigaki_img=live_cam_list["ishigaki"]["img"],
                dotonbori_img=live_cam_list["dotonbori"]["img"],
                osaka_img=live_cam_list["osaka"]["img"],
                naha_img=live_cam_list["naha"]["img"],
                shiodome_img=live_cam_list["shiodome"]["img"],
                shibuya_img=live_cam_list["shibuya"]["img"],
                hakodate_img=live_cam_list["hakodate"]["img"],
                sapporo_img=live_cam_list["sapporo"]["img"],
                updated_date=updated_date,
            )
        )
