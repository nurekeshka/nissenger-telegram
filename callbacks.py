from constants import MessageTexts
from telebot import types
from bot import bot


class BaseCallbackAction(object):
    def callback_action(self, bot, message: types.Message):
        pass


class ReportCallbackAction(BaseCallbackAction):
    text = MessageTexts.report_callback_text.value
    callback_text = MessageTexts.report_callback_thanks.value

    @classmethod
    def report(self, message: types.Message):
        return '\n'.join([
            f'Имя пользователя: {message.from_user.username}',
            f'Имя: {message.from_user.first_name}',
            f'Фамилия: {message.from_user.last_name}',
            f'Текст:',
            message.text,
            '',
            f'REPORT_ID: {message.from_user.id}'])

    @classmethod
    def callback_action(self, call: types.CallbackQuery):
        bot.answer_callback_query(callback_query_id=call.id)
        bot.reply_to(call.message, self.text)

        bot.register_next_step_handler(
            message=call.message, callback=self.callbacks_handler)

    @classmethod
    def callbacks_handler(self, message: types.Message):
        bot.forward_to_admins(self.report(message))
