from constants import MessageTexts
from telebot import types
from bot import bot
import callbacks


routepatterns = {
    'write-report': callbacks.ReportCallbackAction,
}


@bot.message_handler(commands=['start'])
def start_command(message: types.Message):
    bot.reply_to(message=message, text=MessageTexts.menu.value)


@bot.message_handler(content_types=['text'])
def message_handler(message: types.Message):
    if message.chat.id == int(bot.admin_chat_id):
        if message.reply_to_message:
            index = message.reply_to_message.text.index('REPORT_ID: ')
            reciever = message.reply_to_message.text[index +
                                                     len('REPORT_ID: '):]

            bot.send_message(chat_id=int(reciever), text=message.text)
    else:
        callbacks.ReportCallbackAction.callbacks_handler(message)
