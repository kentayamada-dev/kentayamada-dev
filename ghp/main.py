import asyncio
from os import environ
from pathlib import Path

from dotenv import load_dotenv
from jinja2 import Environment, FileSystemLoader, select_autoescape

from automate import Automate


async def main() -> None:
    load_dotenv(override=True)
    automate = Automate(environ["CONTENTFUL_ACCESS_TOKEN"])
    current_datetime = environ["CURRENT_DATETIME"]
    urls = await automate.get_urls()

    template = Environment(loader=FileSystemLoader("."), autoescape=select_autoescape()).get_template("README.tpl")

    split_current_datetime = current_datetime.split("_")
    updated_date = f"{split_current_datetime[0].replace('-', '/')} {split_current_datetime[1].replace('-', ':')}"

    Path("./generated").mkdir(parents=True, exist_ok=True)
    Path("./generated/README.md").write_text(
        template.render(updated_date=updated_date, urls=urls),
        encoding="utf-8",
    )


if __name__ == "__main__":
    asyncio.run(main())
