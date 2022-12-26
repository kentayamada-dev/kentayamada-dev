from PIL import Image
from playwright.sync_api import sync_playwright


class YouTube:
    YOUTUBE_URL = "https://www.youtube.com"

    @classmethod
    def get_video_id(cls, channel_path: str, video_title: str):
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(
                executable_path="/usr/bin/google-chrome-stable"
            )
            page = browser.new_page()
            page.goto(f"{cls.YOUTUBE_URL}/{channel_path}/featured")
            url = page.locator(f'a:has-text("{video_title}")').first.get_attribute(
                "href"
            )
            browser.close()
            target_char = "="
            idx = url.find(target_char)  # type: ignore
            video_id = url[idx + len(target_char) :]  # type: ignore

            return video_id

    @classmethod
    def save_video_capture(
        cls,
        video_id: str,
        capture_image_title: str,
        dir_name: str,
        temp_dir_name: str,
        crop_rectangle: tuple[int, int],
    ):
        width = 1920
        height = 1080
        temp_image_path = f"{temp_dir_name}/{capture_image_title}.png"
        video_capture_path = f"{dir_name}/{capture_image_title}.webp"
        url = f"{cls.YOUTUBE_URL}/embed/{video_id}?rel=0&html5=1&autoplay=1"

        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(
                executable_path="/usr/bin/google-chrome-stable"
            )
            page = browser.new_page()
            page.set_viewport_size({"width": width, "height": height})
            page.goto(url)
            page.wait_for_timeout(3000)
            page.locator("button.ytp-play-button").click()
            page.wait_for_timeout(3000)
            page.screenshot(path=temp_image_path)
            browser.close()

        Image.open(temp_image_path).crop(
            (
                10,
                crop_rectangle[0],
                width - 10,
                height - crop_rectangle[1],
            )
        ).save(video_capture_path, quality=100, method=6)

        return video_capture_path, url
