from __future__ import annotations

import asyncio
import json
import shutil
from collections.abc import Coroutine
from os import environ
from pathlib import Path
from typing import TYPE_CHECKING, Any

from dotenv import load_dotenv
from jinja2 import Environment, FileSystemLoader, select_autoescape
from PIL import Image

from automate import Automate
from constants import ASSETS_FOLDER_NAME, SATELLITE_IMG_NAME, TEMP_IMG_FOLDER_NAME

if TYPE_CHECKING:
    from collections.abc import Coroutine

CityInfo = dict[str, dict[str, str]]
LocationData = dict[str, dict[str, dict[str, CityInfo]]]


async def main() -> None:
    load_dotenv(override=True)
    automate = Automate()
    current_datetime = environ["CURRENT_DATETIME"]
    is_night = current_datetime.split("_")[1].split("-")[0] >= "18"
    weather_tasks: list[Coroutine[Any, Any, dict[str, str]]] = []
    screen_shot_tasks: list[Coroutine[Any, Any, None]] = [automate.satellite_screenshot()]
    data = json.loads(Path("./data.json").read_text())

    for obj in data.values():
        for city_name, city in obj["cities"].items():
            youtube = city["youtube"]
            weather = city["weather"]
            file_name = f"{city_name}_{current_datetime}"
            youtube["img_path"] = f"./github-profile/{ASSETS_FOLDER_NAME}/{file_name}.webp"
            screen_shot_tasks.append(
                automate.youtube_screenshot(
                    info=youtube,
                    file_name=file_name,
                ),
            )
            weather_tasks.append(automate.weather_data(weather["query"], is_night=is_night))
    async with asyncio.TaskGroup() as task_group:
        flash_news_result = task_group.create_task(
            automate.flash_news_data(),
        )
        topics_result = task_group.create_task(
            automate.topics_data(),
        )
        [task_group.create_task(task) for task in screen_shot_tasks]
        weather_results = [task_group.create_task(task) for task in weather_tasks]

    template = Environment(loader=FileSystemLoader("."), autoescape=select_autoescape()).get_template("README.tpl")
    split_current_datetime = current_datetime.split("_")
    updated_date = f"{split_current_datetime[0].replace('-', '/')} {split_current_datetime[1].replace('-', ':')}"

    for index, obj in enumerate(data.values()):
        for city in obj["cities"].values():
            city["weather"].update([task.result() for task in weather_results][index])

    Path("../README.md").write_text(
        template.render(
            satellite_image_path=f"./github-profile/{ASSETS_FOLDER_NAME}/{SATELLITE_IMG_NAME}.webp",
            weather=data,
            flashes=flash_news_result.result(),
            topics=topics_result.result(),
            updated_date=updated_date,
        ),
        encoding="utf-8",
    )


def convert_images() -> None:
    shutil.rmtree(f"./{ASSETS_FOLDER_NAME}")
    Path(ASSETS_FOLDER_NAME).mkdir()

    for file in Path(f"./{TEMP_IMG_FOLDER_NAME}/").glob("*.png"):
        file_name = file.stem
        image = Image.open(file)  # type: ignore  # noqa: PGH003
        image = image.convert("RGB")
        new_file = f"./{ASSETS_FOLDER_NAME}/{file_name}.webp"
        image.save(new_file, "webp")  # type: ignore  # noqa: PGH003


if __name__ == "__main__":
    asyncio.run(main())
    convert_images()
