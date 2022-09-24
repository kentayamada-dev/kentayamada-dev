import random
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager

# https://developers.whatismybrowser.com/useragents/explore/

USER_AGENT_LISTS = [
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
    "Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:24.0) Gecko/20100101 Firefox/24.0",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
]

CHROME_OPTION_LISTS = [
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
    user_agent = USER_AGENT_LISTS[random.randrange(0, len(USER_AGENT_LISTS), 1)]

    arguments = [*CHROME_OPTION_LISTS, f"--user-agent={user_agent}"]

    options = Options()
    for argument in arguments:
        options.add_argument(argument)
    chrome_driver = webdriver.Chrome(
        service=ChromeService(ChromeDriverManager().install()), options=options
    )
    return chrome_driver
