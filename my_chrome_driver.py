from selenium.webdriver import Chrome
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager


class MyChromeDriver:
    @staticmethod
    def get_chrome_driver():
        chrome_option_lists = [
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
        arguments = [
            *chrome_option_lists,
            # https://developers.whatismybrowser.com/useragents/explore/
            "--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/605.1.15 (KHTML, like Gecko)",
        ]
        options = Options()

        for argument in arguments:
            options.add_argument(argument)
        chrome_driver = Chrome(
            service=ChromeService(ChromeDriverManager().install()), options=options
        )

        return chrome_driver
