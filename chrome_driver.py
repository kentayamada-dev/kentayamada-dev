from random import randrange
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from constants import CHROME_OPTION_LISTS, USER_AGENT_LISTS


def get_chrome_driver():
    user_agent = USER_AGENT_LISTS[randrange(0, len(USER_AGENT_LISTS), 1)]

    arguments = [*CHROME_OPTION_LISTS, f"--user-agent={user_agent}"]

    options = Options()
    for argument in arguments:
        options.add_argument(argument)
    chrome_driver = webdriver.Chrome(
        service=ChromeService(ChromeDriverManager().install()), options=options
    )
    return chrome_driver, user_agent
