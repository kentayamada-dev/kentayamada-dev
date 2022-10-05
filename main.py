from os import environ, makedirs, path
from shutil import rmtree
from playwright.sync_api import sync_playwright
from PIL import Image
from tenacity import retry, wait_fixed, stop_after_attempt
from jinja2 import Environment, FileSystemLoader
from google import Google
from my_logger import MyLogger
from youtube import YouTube

CURRENT_DATETIME = environ["CURRENT_DATETIME"]
ASSETS_TEMP_PATH = "assets_temp"
ASSETS_PATH = "assets"
SATELLITE_IMAGE_TITLE = "satellite-image"
SATELLITE_IMAGE_PATH = f"{ASSETS_PATH}/{SATELLITE_IMAGE_TITLE}.webp"

my_logger = MyLogger().get_logger()

YT_ID_NOT_FOUND = "YT_ID_NOT_FOUND"


def override_dir(dir_path: str):
    if path.isdir(dir_path) is True:
        rmtree(dir_path)
    makedirs(dir_path)


def crop_center(pil_img: str, crop_width: int, crop_height: int):
    img_width, img_height = pil_img.size
    return pil_img.crop(
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
def get_weather_data(place_name: str):
    log = f"Place Name : {place_name}"

    try:
        temperature, icon_url, humidity, wind = Google.get_weather_data(
            place_name=place_name
        )

        my_logger.error(log)
    except Exception as exc:
        my_logger.critical(log)
        raise exc

    return temperature, icon_url, humidity, wind


@retry(stop=stop_after_attempt(5), wait=wait_fixed(10))
def save_youtube_video_capture(video_id: str, video_quality: int, city_name: str):
    log = f"City Name     : {city_name}\nVideo ID      : {video_id}\nVideo Quality : {video_quality}"

    if video_id == YT_ID_NOT_FOUND:
        return "static/Image_not_available.wp2"

    try:
        video_capture_path = YouTube().save_video_capture(
            video_id=video_id,
            video_quality=video_quality,
            capture_image_title=f"{city_name}_{CURRENT_DATETIME}",
            dir_name=ASSETS_PATH,
            temp_dir_name=ASSETS_TEMP_PATH,
        )

        my_logger.error(log)
    except Exception as exc:
        my_logger.critical(log)
        raise exc

    return video_capture_path


def get_data():
    data_list = {
        "hokkaido": {
            "name": {
                "en": "Hokkaido",
                "ja": "北海道",
            },
            "weather": {
                "search_query": "室蘭市",
            },
            "cities": {
                "sapporo": {
                    "name": {
                        "en": "Sapporo City",
                        "ja": "札幌市",
                    },
                    "yt": {
                        "quality": 1080,
                        "path": "c/SODANE",
                        "title": "いまの札幌",
                    },
                },
                "hakodate": {
                    "name": {
                        "en": "Hakodate Station",
                        "ja": "函館駅",
                    },
                    "yt": {
                        "quality": 1080,
                        "path": "c/HAKODATELIVECAMERA",
                        "title": "ライブカメラ②",
                    },
                },
            },
        },
        "tokyo": {
            "name": {
                "en": "Tokyo",
                "ja": "東京都",
            },
            "weather": {
                "search_query": "渋谷区",
            },
            "cities": {
                "odaiba": {
                    "name": {
                        "en": "Odaiba",
                        "ja": "お台場",
                    },
                    "yt": {
                        "quality": 720,
                        "path": "user/FNNnewsCH",
                        "title": "お台場",
                    },
                },
                "shibuya": {
                    "name": {
                        "en": "Shibuya Scramble",
                        "ja": "スクランブル交差点",
                    },
                    "yt": {
                        "quality": 1080,
                        "path": "user/ANNnewsCH",
                        "title": "ライブカメラ",
                    },
                },
            },
        },
        "osaka": {
            "name": {
                "en": "Osaka",
                "ja": "大阪府",
            },
            "weather": {
                "search_query": "大阪市",
            },
            "cities": {
                "osaka": {
                    "name": {
                        "en": "Osaka City",
                        "ja": "大阪市",
                    },
                    "yt": {
                        "quality": 1080,
                        "path": "channel/UCRruWUK0POjg2veibHucffQ",
                        "title": "大阪ライブカメラ",
                    },
                },
                "dotonbori": {
                    "name": {
                        "en": "Dotonbori",
                        "ja": "道頓堀",
                    },
                    "yt": {
                        "quality": 720,
                        "path": "user/RVJplanet",
                        "title": "大阪道頓堀ライブカメラ",
                    },
                },
            },
        },
        "okinawa": {
            "name": {
                "en": "Okinawa",
                "ja": "沖縄県",
            },
            "weather": {
                "search_query": "沖縄県",
            },
            "cities": {
                "kariyushi": {
                    "name": {
                        "en": "Kariyushi Beach",
                        "ja": "かりゆしビーチ",
                    },
                    "yt": {
                        "quality": 1080,
                        "path": "user/kariyushihotels",
                        "title": "かりゆしプライベートビーチ",
                    },
                },
                "naha": {
                    "name": {
                        "en": "Naha Airport",
                        "ja": "那覇空港",
                    },
                    "yt": {
                        "quality": 1080,
                        "path": "channel/UCWzx-v_6kdTKi3oXhWOK1FA",
                        "title": "那覇空港",
                    },
                },
            },
        },
    }

    for _, obj in data_list.items():
        weather = obj["weather"]
        (
            weather["temperature"],
            weather["icon_url"],
            weather["humidity"],
            weather["wind"],
        ) = get_weather_data(weather["search_query"])

        for city_name, city in obj["cities"].items():
            yt_obj = city["yt"]
            yt_id = get_youtube_video_id(
                channel_path=yt_obj["path"], video_title=yt_obj["title"]
            )
            yt_obj["img_path"] = save_youtube_video_capture(
                video_id=yt_id, video_quality=yt_obj["quality"], city_name=city_name
            )

    return data_list


def save_satellite_image():
    temp_image_path = f"{ASSETS_TEMP_PATH}/{SATELLITE_IMAGE_TITLE}.png"

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(
            executable_path="/usr/bin/google-chrome-stable"
        )
        page = browser.new_page()
        page.set_viewport_size({"width": 1920, "height": 1080})
        page.goto("https://zoom.earth/places/japan/#overlays=labels:off")
        page.wait_for_timeout(3000)
        page.screenshot(path=temp_image_path)
        browser.close()

    initial_image = Image.open(temp_image_path)
    cropped_image = crop_center(initial_image, 1280, 720)
    cropped_image.save(SATELLITE_IMAGE_PATH, quality=100, method=6)


if __name__ == "__main__":
    override_dir(ASSETS_TEMP_PATH)
    override_dir(ASSETS_PATH)

    save_satellite_image()
    template = Environment(loader=FileSystemLoader(".")).get_template("README.tpl")
    current_datetime = CURRENT_DATETIME.split("_")
    updated_date = f"{current_datetime[0].replace('-', '/')} {current_datetime[1].replace('-', ':')}"

    with open("README.md", "w", encoding="utf-8") as file:
        file.write(
            template.render(
                satellite_image_path=SATELLITE_IMAGE_PATH,
                data=get_data(),
                updated_date=updated_date,
            )
        )
