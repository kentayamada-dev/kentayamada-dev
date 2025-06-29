import asyncio
from os import environ
from pathlib import Path

from dotenv import load_dotenv
from jinja2 import Environment, FileSystemLoader, select_autoescape

from automate import Automate


async def main() -> None:
    load_dotenv(override=True)
    automate = Automate()
    current_datetime = environ["CURRENT_DATETIME"]
    print(current_datetime)
    flash_news = await automate.flash_news_data()
    print(flash_news)

    template = Environment(loader=FileSystemLoader("."), autoescape=select_autoescape()).get_template("README.tpl")

    Path("./generated").mkdir(parents=True, exist_ok=True)
    Path("./generated/README.md").write_text(
        template.render(),
        encoding="utf-8",
    )


if __name__ == "__main__":
    asyncio.run(main())
