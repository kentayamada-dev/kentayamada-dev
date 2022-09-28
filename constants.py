from os import environ

# https://developers.whatismybrowser.com/useragents/explore/
USER_AGENT_LISTS = [
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:24.0) Gecko/20100101 Firefox/24.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.10 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.10"
]

CHROME_OPTION_LISTS = [
    "--incognito",
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-extensions",
    "--disable-web-security",
    "--disable-desktop-notifications",
    "--allow-running-insecure-content",
    "--ignore-certificate-errors",
    "--blink-settings=imagesEnabled=false",
    '--proxy-server="direct://"',
    "--disable-dev-shm-usage",
    "--proxy-bypass-list=*",
    "--start-maximized",
    "--kiosk",
]

CURRENT_DATETIME = environ["CURRENT_DATETIME"]

DYNAMIC_LIVE_CAM_LIST = [
    {"path": "c/HAKODATELIVECAMERA", "key": "hakodate", "text": "函館駅前ライブカメラ②"},
    {"path": "channel/UCRruWUK0POjg2veibHucffQ", "key": "osaka", "text": "大阪ライブカメラ"},
    {"path": "user/ANNnewsCH", "key": "shibuya", "text": "渋谷スクランブル交差点"},
    {
        "path": "channel/UCQJE3qm7Sjc5-JXAYjAfkrw",
        "key": "ishigaki",
        "text": "石垣島730交差点LIVEカメラ",
    },
]
STATIC_LIVE_CAM_LIST = {
    "odaiba": {
        "id": "mfliIqaZddU",
        "quality": "720p",
        "weather": {
            "loc": "東京都港区台場",
        },
    },
    "shibuya": {
        "quality": "1080p",
        "weather": {
            "loc": "東京都渋谷区道玄坂",
        },
    },
    "sapporo": {
        "id": "kfIQBC0hrII",
        "quality": "1080p",
        "weather": {
            "loc": "北海道札幌市中央区北１条西",
        },
    },
    "hakodate": {
        "quality": "1080p",
        "query": "Hakodate",
        "weather": {
            "loc": "北海道函館市若松町",
        },
    },
    "kariyushi": {
        "id": "fVaZnM20GVE",
        "quality": "1080p",
        "weather": {
            "loc": "沖縄県恩納村名嘉真",
        },
    },
    "ishigaki": {
        "quality": "720p",
        "weather": {
            "loc": "沖縄県石垣市大川",
        },
    },
    "osaka": {
        "quality": "1080p",
        "weather": {
            "loc": "大阪府大阪市福島区",
        },
    },
    "dotonbori": {
        "id": "XIonBdj9zBs",
        "quality": "720p",
        "weather": {
            "loc": "大阪府大阪市中央区道頓堀",
        },
    },
}
