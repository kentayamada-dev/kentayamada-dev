from os import environ, makedirs, path
from shutil import rmtree
from tenacity import retry, wait_fixed, stop_after_attempt
from jinja2 import Environment, FileSystemLoader
from google import Google
from my_logger import MyLogger
from youtube import YouTube

CURRENT_DATETIME = environ["CURRENT_DATETIME"]
ASSETS_TEMP_PATH = "assets_temp"
ASSETS_PATH = "assets"

my_logger = MyLogger().get_logger()


def override_dir(dir_path: str):
    if path.isdir(dir_path) is True:
        rmtree(dir_path)
    makedirs(dir_path)


@retry(stop=stop_after_attempt(5), wait=wait_fixed(30))
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


@retry(stop=stop_after_attempt(5), wait=wait_fixed(1))
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


@retry(stop=stop_after_attempt(5), wait=wait_fixed(3))
def save_youtube_video_capture(video_id: str, video_quality: int, city_name: str):
    log = f"City Name     : {city_name}\nVideo ID      : {video_id}\nVideo Quality : {video_quality}"

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
                "search_query": "北海道",
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
                "search_query": "東京都",
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
                "search_query": "大阪府",
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


if __name__ == "__main__":
    override_dir(ASSETS_TEMP_PATH)
    override_dir(ASSETS_PATH)

    template = Environment(loader=FileSystemLoader(".")).get_template("README.tpl")
    current_datetime = CURRENT_DATETIME.split("_")
    updated_date = f"{current_datetime[0].replace('-', '/')} {current_datetime[1].replace('-', ':')}"

    with open("README.md", "w", encoding="utf-8") as file:
        file.write(
            template.render(
                data=get_data(),
                updated_date=updated_date,
            )
        )
