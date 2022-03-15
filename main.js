const { Telegraf } = require('telegraf');

const TOKEN = '5226111864:AAEiG3LADKFTqS5zcCgCqarsIHG3_aVmq80';
const CHAT_ID = '-617099621'

const bot = new Telegraf(TOKEN);


introduction = 'Good day!';

bot.start((ctx) => {
    ctx.reply(introduction);
});

bot.on('text', (ctx) => {
    report = '******\tReport\t******\n\n';
    report += `ID: ${ctx.message.from.id}\n`;
    report += `Имя пользователя: ${ctx.from.first_name}\n\n`;
    report += `Сообщение: ${ctx.message.text}`;

    ctx.telegram.sendMessage(
        CHAT_ID, 
        report);
    ctx.reply('Благодарим за помощь! Рассмотрим ваше сообщение как только покормим наших котиков');
});

bot.launch();