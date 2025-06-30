from typing import Any

import aiohttp

from custom_logger import CustomLogger


class Automate:
    def __init__(self, access_token: str) -> None:
        self.logger = CustomLogger()
        self.access_token = access_token

    @staticmethod
    async def __fetch_data(url: str, headers: Any) -> Any:  # noqa: ANN401
        async with aiohttp.ClientSession() as session, session.get(url, headers=headers) as response:  # type: ignore  # noqa: PGH003
            return await response.json()

    async def get_urls(self) -> list[str]:
        response = await self.__fetch_data(
            "https://cdn.contentful.com/spaces/hgf9za4608k6/environments/master/entries?content_type=article&select=fields.slug",
            headers={"Authorization": f"Bearer {self.access_token}"},
        )

        slugs = [item["fields"]["slug"] for item in response["items"]]

        urls = [f"https://www.kentayamada.dev/en/articles/{slug}" for slug in slugs]

        self.logger.debug(urls)
        return urls
