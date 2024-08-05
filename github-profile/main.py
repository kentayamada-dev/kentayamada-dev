from __future__ import annotations

import asyncio
import json
from collections.abc import Coroutine
from os import environ
from pathlib import Path
from typing import TYPE_CHECKING, Any

from dotenv import load_dotenv
from jinja2 import Environment, FileSystemLoader, select_autoescape

from automate import Automate

if TYPE_CHECKING:
    from collections.abc import Coroutine


async def main() -> None:
    load_dotenv(override=True)
    automate = Automate()
    current_datetime = environ["CURRENT_DATETIME"]
    is_night = current_datetime.split("_")[1].split("-")[0] >= "18"
    weather_tasks: list[Coroutine[Any, Any, None]] = []
    screen_shot_tasks: list[Coroutine[Any, Any, None]] = []
    data = json.loads(Path("./data.json").read_text(encoding="utf-8"))

    for obj in data.values():
        for city_name, city in obj["cities"].items():
            youtube = city["youtube"]
            weather = city["weather"]
            file_name = f"{city_name}_{current_datetime}"
            screen_shot_tasks.append(
                automate.youtube_screenshot(
                    youtube=youtube,
                    file_name=file_name,
                ),
            )
            weather_tasks.append(automate.weather_data(weather, is_night=is_night))
    async with asyncio.TaskGroup() as task_group:
        flash_news_result = task_group.create_task(
            automate.flash_news_data(),
        )
        topics_result = task_group.create_task(
            automate.topics_data(),
        )
        satellite_result = task_group.create_task(automate.satellite_screenshot())
        [task_group.create_task(task) for task in screen_shot_tasks]
        [task_group.create_task(task) for task in weather_tasks]

    template = Environment(loader=FileSystemLoader("."), autoescape=select_autoescape()).get_template("README.tpl")
    split_current_datetime = current_datetime.split("_")
    updated_date = f"{split_current_datetime[0].replace('-', '/')} {split_current_datetime[1].replace('-', ':')}"

    Path("../README.md").write_text(
        template.render(
            satellite_image_path=satellite_result.result(),
            weather=data,
            flashes=flash_news_result.result(),
            topics=topics_result.result(),
            updated_date=updated_date,
        ),
        encoding="utf-8",
    )


if __name__ == "__main__":
    asyncio.run(main())
