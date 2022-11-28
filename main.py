from routes import bot


if __name__ == '__main__':
    print('[LOG] Telegram bot has been started')
    bot.infinity_polling()
