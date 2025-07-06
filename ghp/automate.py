from datetime import datetime, timezone
from typing import Any
from urllib.parse import quote

import aiohttp

from custom_logger import CustomLogger


class Automate:
    def __init__(self) -> None:
        self.logger = CustomLogger()

    @staticmethod
    async def __fetch_data(url: str, headers: Any) -> Any:  # noqa: ANN401
        async with aiohttp.ClientSession() as session, session.get(url, headers=headers) as response:  # type: ignore  # noqa: PGH003
            return await response.json()

    @staticmethod
    def __get_utc(date_string: str) -> datetime:
        try:
            return datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%S.%fZ").replace(tzinfo=timezone.utc)
        except ValueError:
            return datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%SZ").replace(tzinfo=timezone.utc)

    def __get_date_string(self, date_string: str, current_date_string: str) -> str:
        utc_time = self.__get_utc(date_string)
        current_year = self.__get_utc(current_date_string).year

        if utc_time.year == current_year:
            return utc_time.strftime("%b %d")

        return utc_time.strftime("%b %d, %Y")

    async def get_urls(self, access_token: str, current_date_string: str) -> list[dict[str, str]]:
        response = await self.__fetch_data(
            "https://cdn.contentful.com/spaces/hgf9za4608k6/environments/master/entries?content_type=article&limit=3&order=sys.publishedAt&select=fields.slug,fields.title,fields.subtitle,sys.createdAt",
            headers={"Authorization": f"Bearer {access_token}"},
        )

        urls: list[dict[str, str]] = [
            {
                "article_url": f"https://www.kentayamada.dev/en/articles/{item['fields']['slug']}",
                "image_url": f"https://og.kentayamada058.workers.dev?title={quote(item['fields']['title'])}&subtitle={quote(item['fields']['subtitle'])}&date={quote(self.__get_date_string(item['sys']['createdAt'], current_date_string))}",  # noqa: E501
            }
            for item in response["items"]
        ]

        self.logger.debug(urls)

        return urls
