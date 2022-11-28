import configparser


config = configparser.ConfigParser()
config.read('settings.ini')


TELEGRAM = config.get('TELEGRAM', 'BOT_TOKEN')
TELEGRAM_ADMIN_CHAT = config.get('TELEGRAM', 'ADMIN_CHAT')
