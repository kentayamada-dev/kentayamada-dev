from os import mkdir, environ
from time import sleep
from selenium.webdriver.common.by import By
from jinja2 import Environment, FileSystemLoader
from chrome_driver import get_chrome_driver

# 2160p60
live_cam_list = {
    "shiodome": {"id": "QOjmvL3e7Lc"},
    "shibuya": {"id": "3kPH7kTphnE"},
    "sapporo": {"id": "kfIQBC0hrII"},
    "hakodate": {"id": "0jadU16lEDw"},
    "naha": {"id": "PzjkBErabnU"},
    "onna-son": {"id": "fVaZnM20GVE"},
}

if __name__ == "__main__":
    mkdir("assets_temp")
    chrome_driver = get_chrome_driver()
    for key, value in live_cam_list.items():
        chrome_driver.get(
            f"https://www.youtube.com/embed/{value['id']}?rel=0&html5=1&autoplay=1"
        )
        chrome_driver.set_window_size(1920, 1080)
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
        chrome_driver.find_element(By.XPATH, '//span[contains(text(),"1080p")]').click()

        sleep(3)
        chrome_driver.save_screenshot(
            f"assets_temp/{key}_{environ['CURRENT_DATETIME']}.png"
        )

    env = Environment(loader=FileSystemLoader("."))
    template = env.get_template("README.tpl")

    with open("README.md", "w", encoding="utf-8") as file:
        file.write(template.render())
