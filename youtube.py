from time import sleep
from selenium.webdriver.common.by import By
from PIL import Image
from requests_html import HTMLSession
from my_chrome_driver import MyChromeDriver


class YouTube:
    YOUTUBE_URL = "https://www.youtube.com"

    @classmethod
    def get_video_id(cls, channel_path: str, video_title: str):
        response = HTMLSession().get(
            f"{cls.YOUTUBE_URL}/{channel_path}/videos?view=2&live_view=501"
        )
        response.html.render(sleep=1)
        url = next(
            iter(
                response.html.find(
                    "a#video-title", containing=video_title, first=True
                ).links
            )
        )
        target_char = "="
        idx = url.find(target_char)
        video_id = url[idx + len(target_char) :]

        return video_id

    @classmethod
    def save_video_capture(
        cls,
        video_id: str,
        video_quality: int,
        capture_image_title: str,
        dir_name: str,
        temp_dir_name: str,
    ):
        driver = MyChromeDriver.get_chrome_driver()
        driver.get(f"{cls.YOUTUBE_URL}/embed/{video_id}?rel=0&html5=1&autoplay=1")
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
        driver.find_element(
            By.XPATH, f'//span[contains(text(),"{video_quality}p")]'
        ).click()

        sleep(3)
        temp_image_path = f"{temp_dir_name}/{capture_image_title}.png"
        video_capture_path = f"{dir_name}/{capture_image_title}.webp"
        driver.save_screenshot(temp_image_path)
        Image.open(temp_image_path).save(video_capture_path, quality=100, method=6)

        return video_capture_path
