from PIL import Image
from requests_html import HTMLSession
from playwright.sync_api import sync_playwright


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
        temp_image_path = f"{temp_dir_name}/{capture_image_title}.png"
        video_capture_path = f"{dir_name}/{capture_image_title}.webp"

        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(
                executable_path="/usr/bin/google-chrome-stable"
            )
            page = browser.new_page()
            page.set_viewport_size({"width": 960, "height": 540})
            page.goto(
                f"{cls.YOUTUBE_URL}/embed/{video_id}?rel=0&html5=1&autoplay=1"
            )
            page.wait_for_timeout(3000)
            page.locator("button.ytp-play-button").click()
            page.wait_for_timeout(3000)
            page.locator("button.ytp-settings-button").click()
            page.wait_for_timeout(3000)
            page.locator('//div[@class="ytp-menuitem"]/div[text()="Quality"]').click()
            page.wait_for_timeout(3000)
            page.locator(f'//span[contains(text(),"{video_quality}p")]').click()
            page.wait_for_timeout(3000)
            page.screenshot(path=temp_image_path)
            browser.close()

        Image.open(temp_image_path).save(video_capture_path, quality=100, method=6)

        return video_capture_path
