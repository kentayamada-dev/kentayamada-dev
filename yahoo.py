from time import sleep
from requests_html import HTMLSession


class Yahoo:
    @staticmethod
    def __get_og_image(target_link: str):
        return (
            HTMLSession()
            .get(target_link)
            .html.find("meta[property='og:image']", first=True)  # type: ignore
            .attrs["content"]
        )

    @classmethod
    def get_topics(cls):
        topics = []
        raw_topics = (
            HTMLSession()
            .get("https://www.yahoo.co.jp/")
            .html.find('[aria-label="主要 ニュース"]', first=True)  # type: ignore
            .find("li")
        )
        for raw_topic in raw_topics:
            link = next(iter(raw_topic.links))
            sleep(1)
            topics.append(
                {
                    "link": link,
                    "title": raw_topic.text.replace("\nNEW", "").replace("\nLIVE", ""),
                    "image": cls.__get_og_image(link),
                }
            )

        return topics

    @classmethod
    def get_flashes(cls):
        flashes = []
        raw_flashes = (
            HTMLSession()
            .get("https://news.yahoo.co.jp/flash")
            .html.find("div#contentsWrap > div")  # type: ignore
        )
        for raw_flash in raw_flashes:
            link_tag = raw_flash.find("div:nth-child(2)>div>a", first=True)
            link = next(iter(link_tag.links))
            sleep(1)
            flashes.append(
                {
                    "link": link,
                    "title": link_tag.find("p", first=True).text,
                    "image": cls.__get_og_image(link),
                }
            )

        return flashes
