from __future__ import annotations

import re
from os import environ
from typing import Any, Final

import aiofiles
import aiohttp
from bs4 import BeautifulSoup
from playwright.async_api import FloatRect, async_playwright

from custom_logger import CustomLogger


class Automate:
    TEMP_IMG_FOLDER_NAME: Final = "temp"
    EXECUTABLE_PATH: Final = "/usr/bin/chromium"

    def __init__(self) -> None:
        self.logger = CustomLogger()

    @staticmethod
    def __get_weather_icon(weather_condition: str, *, is_night: bool) -> str:  # noqa: C901, PLR0911
        match weather_condition:
            case "晴れ":
                return "clear-night.svg" if is_night is True else "clear-day.svg"
            case "くもり":
                return "overcast.svg"
            case "うすぐもり":
                return "partly-cloudy-night.svg" if is_night is True else "partly-cloudy-day.svg"
            case "雨":
                return "overcast-rain.svg"
            case "雪":
                return "overcast-snow.svg"
            case "小雨":
                return "overcast-drizzle.svg"
            case "みぞれ":
                return "overcast-hail.svg"
            case "猛暑":
                return "sun-hot.svg"
            case "大雨・嵐":
                return "extreme-rain.svg"
            case "大雪・吹雪":
                return "extreme-snow.svg"
            case _:
                return "not-available.svg"

    @staticmethod
    def __extract_value(data_list: list[str], suffix: str) -> str:
        return next(item.replace(suffix, "") for item in data_list if item.endswith(suffix))

    async def flash_news_data(self) -> list[dict[str, str]]:
        data: list[dict[str, str]] = []
        async with aiohttp.ClientSession() as session, session.get("https://news.yahoo.co.jp/flash") as res:
            [
                data.append({
                    "title": str(tag["aria-label"]),
                    "link": str(tag["href"]),
                    "image": str(tag.find("source", {"type": "image/webp"})["srcset"]),  # type: ignore  # noqa: PGH003
                })
                for tag in BeautifulSoup(await res.text(), "html.parser").select("#contentsWrap > div > div > a")
            ]
        self.logger.debug(data)
        return data

    async def topics_data(self) -> list[dict[str, str]]:
        data: list[dict[str, str]] = []
        async with aiohttp.ClientSession() as session, session.get("https://www.yahoo.co.jp") as res:
            for tag in (  # type: ignore  # noqa: PGH003
                BeautifulSoup(await res.text(), "html.parser")
                .find("div", {"aria-label": "主要 ニュース"})
                .find_all("a")  # type: ignore  # noqa: PGH003
            ):
                article_url = str(tag["href"])  # type: ignore  # noqa: PGH003
                async with session.get(article_url) as article_resp:
                    article_soup = BeautifulSoup(await article_resp.text(), "html.parser")
                    data.append({
                        "title": tag.find("h1").text,  # type: ignore  # noqa: PGH003
                        "link": article_url,
                        "image": str(article_soup.find("meta", {"property": "og:image"})["content"]),  # type: ignore  # noqa: PGH003
                    })
        self.logger.debug(data)
        return data

    async def weather_data(self, weather_init: Any, *, is_night: bool) -> None:  # noqa: ANN401
        async with async_playwright() as playwright:
            browser = await playwright.chromium.launch(executable_path=self.EXECUTABLE_PATH)
            context = await browser.new_context(java_script_enabled=False)
            page = await context.new_page()
            url = f"https://weathernews.jp/onebox/{weather_init['query']}"
            await page.goto(url)
            data = str(await page.locator("div.nowWeather").text_content()).split()
            temperature = self.__extract_value(data, "℃")
            weather = data[0]
            humidity = self.__extract_value(data, "%")
            wind = re.sub("[北東南西]", "", self.__extract_value(data, "m/s"))
            wind_direction = re.sub("[^北東南西]", "", data[13])
            icon = self.__get_weather_icon(weather, is_night=is_night)
            await context.close()
            await browser.close()

        weather_info = {
            "temperature": temperature,
            "humidity": humidity,
            "wind_direction": wind_direction,
            "wind": wind,
            "icon": icon,
            "url": url,
        }
        self.logger.debug(weather_info)
        weather_init.update(weather_info)

    async def satellite_screenshot(self) -> str:
        async with async_playwright() as playwright:
            view_width = 2600
            view_height = 1500
            image_path = f"./{self.TEMP_IMG_FOLDER_NAME}/satellite.png"
            browser = await playwright.chromium.launch(executable_path=self.EXECUTABLE_PATH)
            context = await browser.new_context(
                viewport={"width": view_width, "height": view_height},
            )
            page = await context.new_page()
            await page.goto("https://zoom.earth/places/japan/#overlays=labels:off")
            button = await page.query_selector("aside.panel.welcome > button")
            if button and await button.is_visible():
                await button.click()
            await page.screenshot(
                path=image_path,
                clip=self.__get_clip(view_width, view_height),
            )
            await context.close()
            await browser.close()
            self.logger.debug("Satellite Screenshot Taken.")
            return await self.__upload_image(image_path)

    async def youtube_screenshot(self, youtube: dict[str, str], file_name: str) -> None:
        async with async_playwright() as playwright:
            youtube_url = "https://www.youtube.com"
            view_width = 1920
            view_height = 1300
            image_path = f"./{self.TEMP_IMG_FOLDER_NAME}/{file_name}.png"
            browser = await playwright.chromium.launch(executable_path=self.EXECUTABLE_PATH)
            context = await browser.new_context(
                viewport={"width": view_width, "height": view_height},
            )
            page = await context.new_page()
            try:
                await page.goto(f'{youtube_url}/{youtube["path"]}/streams')
                video_id = str(await page.get_by_title(f'{youtube["title"]}').nth(0).get_attribute("href")).split("=")[
                    -1
                ]
                url = f"{youtube_url}/embed/{video_id}?rel=0&html5=1&autoplay=1"
                youtube["url"] = url
                await page.goto(f"{youtube_url}/embed/{video_id}?rel=0&html5=1&autoplay=1")
                await page.wait_for_timeout(1000)
                await page.locator("button.ytp-play-button").click()
                await page.wait_for_timeout(1000)
                await page.locator("button.ytp-settings-button").click()
                await page.wait_for_timeout(1000)
                await page.locator("div.ytp-menuitem", has_text="Quality").click()
                await page.wait_for_timeout(1000)
                await page.locator("div.ytp-menuitem", has_text="720p").click()
                await page.wait_for_timeout(5000)
                await page.screenshot(
                    path=image_path,
                    clip=self.__get_clip(view_width, view_height),
                )
                await context.close()
                await browser.close()
                self.logger.debug(f"YouTube Screenshot for {file_name} Taken.")  # noqa: G004
                youtube["img_path"] = await self.__upload_image(image_path)
            except Exception as e:  # noqa: BLE001
                self.logger.error(f"Error: {e}")  # noqa: G004, TRY400
                youtube["img_path"] = "./github-profile/static/404.gif"

    @classmethod
    def __get_clip(cls, view_width: int, view_height: int) -> FloatRect:
        clip_width = 1920
        clip_height = 1080
        return {
            "x": (view_width - clip_width) // 2,
            "y": (view_height - clip_height) // 2,
            "height": clip_height,
            "width": clip_width,
        }

    async def __upload_image(self, image_path: str) -> str:
        data = aiohttp.FormData()
        async with aiofiles.open(image_path, mode="rb") as file:
            content = await file.read()
            data.add_field("imagedata", content)
            data.add_field("access_token", environ["GYAZO_ACCESS_TOKEN"])
        async with aiohttp.ClientSession() as session, session.post(
            "https://upload.gyazo.com/api/upload",
            data=data,
        ) as response:
            result = await response.json()
            link = result["url"]
        self.logger.debug(f"File {image_path} uploaded.\nURL: {link}")  # noqa: G004
        return link
