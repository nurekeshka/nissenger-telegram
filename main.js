const { Telegraf } = require('telegraf');

const TOKEN = '5226111864:AAEiG3LADKFTqS5zcCgCqarsIHG3_aVmq80';
const CHAT_ID = '-617099621'

const bot = new Telegraf(TOKEN);


introduction = 'Привет, это команда Nissenger ✋\n\n';
introduction += 'Нашёл баг или есть чем поделиться с нами? Распиши тут, а мы обязательно прочтём и разберемся 😎\n\n';
introduction += 'Если хочешь, чтобы мы связались с тобой - оставь номер телефона, ник телеграм аккаунта или почту 🤖';

thanks = 'Спасибо, что написал, для нас это очень важно. Как закончатся уроки, сразу возьмемся за это 🕓';
alter_thanks = 'Благодарим за помощь! Рассмотрим ваше сообщение как только покормим наших котиков';

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
    ctx.reply(thanks);
});

bot.launch();