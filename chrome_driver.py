from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

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


def get_chrome_driver():
    arguments = [
        *CHROME_OPTION_LISTS,
        # https://developers.whatismybrowser.com/useragents/explore/
        "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko)",
    ]

    options = Options()
    for argument in arguments:
        options.add_argument(argument)
    chrome_driver = webdriver.Chrome(
        service=ChromeService(ChromeDriverManager().install()), options=options
    )
    return chrome_driver
