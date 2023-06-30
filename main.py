from os import environ, makedirs, path
from shutil import rmtree
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright
from PIL import Image
from tenacity import retry, wait_fixed, stop_after_attempt  # type: ignore
from jinja2 import Environment, FileSystemLoader
from my_logger import MyLogger
from weather import Weather
from yahoo import Yahoo
from youtube import YouTube


load_dotenv()
my_logger = MyLogger().get_logger()

CURRENT_DATETIME = environ["CURRENT_DATETIME"]
ASSETS_TEMP_PATH = "assets_temp"
ASSETS_PATH = "assets"
SATELLITE_IMAGE_TITLE = "satellite-image"
SATELLITE_IMAGE_PATH = f"{ASSETS_PATH}/{SATELLITE_IMAGE_TITLE}.webp"
YT_ID_NOT_FOUND = "YT_ID_NOT_FOUND"


def override_dir(dir_path: str):
    if path.isdir(dir_path) is True:
        rmtree(dir_path)
    makedirs(dir_path)


def crop_center(img_path: str, crop_width: int, crop_height: int):
    img = Image.open(img_path)
    img_width, img_height = img.size

    return img.crop(
        (
            (img_width - crop_width) // 2,
            (img_height - crop_height) // 2,
            (img_width + crop_width) // 2,
            (img_height + crop_height) // 2,
        )
    )


@retry(
    stop=stop_after_attempt(5),
    wait=wait_fixed(10),
    retry_error_callback=lambda _: YT_ID_NOT_FOUND,
)
def get_youtube_video_id(channel_path: str, video_title: str):
    log = f"Video Title  : {video_title}\nChannel Path : {channel_path}"

    try:
        video_id = YouTube.get_video_id(
            channel_path=channel_path, video_title=video_title
        )

        my_logger.error(log)
    except Exception as exc:
        my_logger.critical(log)
        raise exc

    return video_id


@retry(stop=stop_after_attempt(5), wait=wait_fixed(10))
def get_weather_data(query: str):
    log = f"Query : {query}"

    try:
        (
            temperature,
            icon,
            humidity,
            wind_direction,
            wind,
            url,
        ) = Weather().get_weather_data(query=query)

        my_logger.error(log)
    except Exception as exc:
        my_logger.critical(log)
        raise exc

    return temperature, icon, humidity, wind_direction, wind, url


@retry(stop=stop_after_attempt(5), wait=wait_fixed(10))
def get_news_data():
    news_flashes = Yahoo.get_flashes()
    news_topics = Yahoo.get_topics()

    return news_flashes, news_topics


@retry(stop=stop_after_attempt(5), wait=wait_fixed(10))
def save_youtube_video_capture(
    video_id: str,
    city_name: str,
    crop_rectangle: tuple[int, int],
):
    log = f"City Name     : {city_name}\nVideo ID      : {video_id}"

    if video_id == YT_ID_NOT_FOUND:
        return "static/Image_not_available.webp", "static/Image_not_available.webp"

    try:
        video_capture_path, url = YouTube().save_video_capture(
            video_id=video_id,
            capture_image_title=f"{city_name}_{CURRENT_DATETIME}",
            dir_name=ASSETS_PATH,
            temp_dir_name=ASSETS_TEMP_PATH,
            crop_rectangle=crop_rectangle,
        )

        my_logger.error(log)
    except Exception as exc:
        my_logger.critical(log)
        raise exc

    return video_capture_path, url


def weather_data():
    data_list = {
        "hokkaido": {
            "name": {
                "en": "Hokkaido",
                "ja": "北海道",
            },
            "cities": {
                "sapporo": {
                    "weather": {
                        "search_query": "43.060923/141.341617/q=北海道札幌市中央区北一条西",
                    },
                    "name": {
                        "en": "Sapporo City",
                        "ja": "札幌市",
                    },
                    "yt": {
                        "path": "c/SODANE",
                        "title": "いまの札幌",
                        "crop_rectangle": (40, 100),
                    },
                },
                "hakodate": {
                    "weather": {
                        "search_query": "41.775022/140.728149/q=北海道函館市若松町",
                    },
                    "name": {
                        "en": "Hakodate Station",
                        "ja": "函館駅",
                    },
                    "yt": {
                        "path": "c/HAKODATELIVECAMERA",
                        "title": "ライブカメラ②",
                        "crop_rectangle": (70, 70),
                    },
                },
            },
        },
        "tokyo": {
            "name": {
                "en": "Tokyo",
                "ja": "東京都",
            },
            "cities": {
                "odaiba": {
                    "weather": {
                        "search_query": "35.627735/139.773009/q=東京都港区台場",
                    },
                    "name": {
                        "en": "Odaiba",
                        "ja": "お台場",
                    },
                    "yt": {
                        "path": "user/FNNnewsCH",
                        "title": "お台場",
                        "crop_rectangle": (70, 70),
                    },
                },
                "shibuya": {
                    "weather": {
                        "search_query": "35.658320/139.702232/q=東京都渋谷区渋谷渋谷スクランブルスクエア",
                    },
                    "name": {
                        "en": "Shibuya Scramble",
                        "ja": "スクランブル交差点",
                    },
                    "yt": {
                        "path": "user/ANNnewsCH",
                        "title": "【LIVE】渋谷スクランブル交差点 Shibuya Scramble Crossing Live Camera",
                        "crop_rectangle": (70, 70),
                    },
                },
            },
        },
        "osaka": {
            "name": {
                "en": "Osaka",
                "ja": "大阪府",
            },
            "cities": {
                "osaka": {
                    "weather": {
                        "search_query": "34.692432/135.478216/q=大阪市福島区",
                    },
                    "name": {
                        "en": "Osaka City",
                        "ja": "大阪市",
                    },
                    "yt": {
                        "path": "@LIVE-hr9eo",
                        "title": "大阪・中之島定点カメラ＠朝日新聞大阪本社",
                        "crop_rectangle": (70, 70),
                    },
                },
                "dotonbori": {
                    "weather": {
                        "search_query": "34.668538/135.503961/q=大阪府大阪市中央区道頓堀",
                    },
                    "name": {
                        "en": "Dotonbori",
                        "ja": "道頓堀",
                    },
                    "yt": {
                        "path": "user/RVJplanet",
                        "title": "【LIVE】大阪道頓堀ライブカメラ",
                        "crop_rectangle": (70, 70),
                    },
                },
            },
        },
        "okinawa": {
            "name": {
                "en": "Okinawa",
                "ja": "沖縄県",
            },
            "cities": {
                "kariyushi": {
                    "weather": {
                        "search_query": "26.213141/127.690802/q=沖縄県那覇市",
                    },
                    "name": {
                        "en": "Naha City",
                        "ja": "那覇市",
                    },
                    "yt": {
                        "path": "@LIVE-hr9eo",
                        "title": "那覇市内の現在の様子",
                        "crop_rectangle": (70, 70),
                    },
                },
                "naha": {
                    "weather": {
                        "search_query": "26.196562/127.646794/q=那覇空港（沖縄県）",
                    },
                    "name": {
                        "en": "Naha Airport",
                        "ja": "那覇空港",
                    },
                    "yt": {
                        "path": "@rbcnewslink",
                        "title": "沖縄・那覇空港",
                        "crop_rectangle": (70, 70),
                    },
                },
            },
        },
    }

    for _, obj in data_list.items():
        for city_name, city in obj["cities"].items():
            weather_obj = city["weather"]
            yt_obj = city["yt"]

            (
                weather_obj["temperature"],
                weather_obj["icon"],
                weather_obj["humidity"],
                weather_obj["wind_direction"],
                weather_obj["wind"],
                weather_obj["url"],
            ) = get_weather_data(weather_obj["search_query"])

            yt_id = get_youtube_video_id(
                channel_path=yt_obj["path"], video_title=yt_obj["title"]
            )

            yt_obj["img_path"], yt_obj["url"] = save_youtube_video_capture(
                video_id=yt_id,
                city_name=city_name,
                crop_rectangle=yt_obj["crop_rectangle"],
            )

    return data_list


def save_satellite_image():
    temp_img_path = f"{ASSETS_TEMP_PATH}/{SATELLITE_IMAGE_TITLE}.png"

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            executable_path="/usr/bin/google-chrome-stable"
        )
        page = browser.new_page()
        page.set_viewport_size({"width": 1920, "height": 1080})
        page.goto("https://zoom.earth/places/japan/#overlays=labels:off")
        page.wait_for_timeout(5000)
        page.screenshot(path=temp_img_path)
        browser.close()

    crop_center(temp_img_path, 1280, 720).save(
        SATELLITE_IMAGE_PATH, quality=100, method=6
    )


if __name__ == "__main__":
    override_dir(ASSETS_TEMP_PATH)
    override_dir(ASSETS_PATH)

    save_satellite_image()
    template = Environment(loader=FileSystemLoader(".")).get_template("README.tpl")
    current_datetime = CURRENT_DATETIME.split("_")
    updated_date = f"{current_datetime[0].replace('-', '/')} {current_datetime[1].replace('-', ':')}"
    flashes, topics = get_news_data()

    with open("README.md", "w", encoding="utf-8") as file:
        file.write(
            template.render(
                satellite_image_path=SATELLITE_IMAGE_PATH,
                weather=weather_data(),
                flashes=flashes,
                topics=topics,
                updated_date=updated_date,
            )
        )
