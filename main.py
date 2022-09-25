from os import mkdir, environ
from time import sleep
from selenium.webdriver.common.by import By
from jinja2 import Environment, FileSystemLoader
from chrome_driver import get_chrome_driver

live_cam_list = {
    "shiodome": {"id": "QOjmvL3e7Lc", "quality": "1080p"},
    "shibuya": {"id": "3kPH7kTphnE", "quality": "1080p"},
    "sapporo": {"id": "kfIQBC0hrII", "quality": "1080p"},
    "hakodate": {"quality": "1080p"},
    "naha": {"id": "PzjkBErabnU", "quality": "1080p"},
    "onna-son": {"id": "fVaZnM20GVE", "quality": "1080p"},
    "osaka": {"id": "u8JsosYl51Q", "quality": "1080p"},
    "namba": {"id": "XIonBdj9zBs", "quality": "720p"},
}

CURRENT_DATETIME = environ["CURRENT_DATETIME"]

if __name__ == "__main__":
    mkdir("assets_temp")
    env = Environment(loader=FileSystemLoader("."))
    template = env.get_template("README.tpl")
    current_datetime = CURRENT_DATETIME.split("_")
    updated_date = f"{current_datetime[0].replace('-', '/')} {current_datetime[1].replace('-', ':')}"
    chrome_driver = get_chrome_driver()

    chrome_driver.get(
        "https://www.youtube.com/c/HAKODATELIVECAMERA/videos?view=2&sort=dd&live_view=501&shelf_id=0"
    )
    sleep(3)
    hakodate_url = chrome_driver.find_element(
        By.XPATH, '//a[contains(text(),"函館駅前ライブカメラ①")]'
    ).get_attribute("href")
    TARGET = "="
    idx = hakodate_url.find(TARGET)
    hakodate_id = hakodate_url[idx + len(TARGET) :]
    live_cam_list["hakodate"]["id"] = hakodate_id

    for key, value in live_cam_list.items():
        chrome_driver.get(
            f"https://www.youtube.com/embed/{value['id']}?rel=0&html5=1&autoplay=1"
        )
        chrome_driver.set_window_size(960, 540)
        w = chrome_driver.execute_script("return document.body.scrollWidth")
        h = chrome_driver.execute_script("return document.body.scrollHeight")
        chrome_driver.set_window_size(w, h)

        sleep(3)
        chrome_driver.find_element(By.XPATH, '//button[@aria-label="Play"]').click()

        sleep(3)
        chrome_driver.find_element(By.CLASS_NAME, "ytp-settings-button").click()

        sleep(3)
        chrome_driver.find_element(
            By.XPATH, '//div[@class="ytp-menuitem"]/div[text()="Quality"]'
        ).click()

        sleep(3)
        # 2160p60
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

    with open("README.md", "w", encoding="utf-8") as file:
        file.write(
            template.render(
                namba_img=live_cam_list["namba"]["img"],
                osaka_img=live_cam_list["osaka"]["img"],
                onnason_img=live_cam_list["onna-son"]["img"],
                naha_img=live_cam_list["naha"]["img"],
                shiodome_img=live_cam_list["shiodome"]["img"],
                shibuya_img=live_cam_list["shibuya"]["img"],
                hakodate_img=live_cam_list["hakodate"]["img"],
                sapporo_img=live_cam_list["sapporo"]["img"],
                updated_date=updated_date,
            )
        )
