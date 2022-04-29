const { Telegraf } = require('telegraf');
require('dotenv').config();

if (process.env.TOKEN === undefined) {
    throw new TypeError('BOT_TOKEN must be provided!')
}

const config = {
    "token": process.env.TOKEN
};

const bot = new Telegraf(
    config.token, {}
);

const data = {};

introduction = 'Привет, это команда Nissenger ✋\n\n';
introduction += 'Нашёл баг или есть чем поделиться с нами? Нажми на "Написать в Тех. Поддержку" и распиши тут, а мы обязательно прочтём и разберемся 🤖\n\n';
introduction += 'Хочешь связаться со школьной администрацией? Тогда нажимай на "Написать в Администрацию" и твое сообщение будет доставлено анонимно 🏫\n\n';
introduction += 'Если хочешь, чтобы мы связались с тобой — оставь номер телефона, ник телеграм аккаунта или почту 😎';

function make_report(ctx) {
    report = '******\tReport\t******\n\n';
    report += `USER-ID: ${ctx.message.from.id}\n`;
    report += `USER-FIRSTNAME: ${ctx.from.first_name}\n`;
    report += `USER-USERNAME: ${ctx.from.username}\n\n`;
    report += `BOT: ${ctx.from.is_bot}\n\n`;
    report += `CHAT-ID: ${ctx.chat.id}\n`;
    report += `CHAT-FIRSTNAME: ${ctx.chat.first_name}\n`;
    report += `CHAT-USERNAME: ${ctx.chat.username}\n\n`;
    report += `Сообщение: "${ctx.message.text}"`;

    return report;
}

bot.start((ctx) => {
    ctx.telegram.sendMessage(ctx.chat.id, introduction, {
        reply_markup: {
            one_time_keyboard: true,
            resize_keyboard: true,
            inline_keyboard: [
                [{text:"🏫 Написать в Администрацию 🏫", callback_data: "administration"}],
                [{text:"🤖 Написать в Тех. Поддержку 🤖", callback_data: "technical support"}]
            ]
        }
    });
});

bot.action("administration", (ctx) => {
    data[ctx.from.id] = "admin";
    ctx.reply("Следующее сообщение отправится в чат администрации:");
});

bot.action("technical support", (ctx) => {
    data[ctx.from.id] = "support";
    ctx.reply("Следующее сообщение отправится разработчикам:");
});

bot.on("text", (ctx) => {
    if (ctx.message.reply_to_message && ctx.message.reply_to_message.text.startsWith("****** Report ******")) {
        if (
            (ctx.from.id === 1270570382 || ctx.from.id === 999657821) && 
            (ctx.chat.id == process.env.NISSENGER_CHAT_ID || ctx.chat.id == process.env.ADMIN_CHAT_ID)
        ) {
            const message = ctx.message.reply_to_message.text;
            const chatid = message.slice(message.indexOf("CHAT-ID:") + 9, message.indexOf("CHAT-FIRSTNAME:") - 1);

            if (ctx.chat.id == process.env.NISSENGER_CHAT_ID) {
                ctx.telegram.sendMessage(chatid, "Сообщение от тех. поддержки:\n" + ctx.message.text);
            } else if (ctx.chat.id == process.env.ADMIN_CHAT_ID) {
                ctx.telegram.sendMessage(chatid, "Сообщение от школьной администрации:\n" + ctx.message.text);
            }
        }
    } else {
        if (data[ctx.from.id]) {
            report = make_report(ctx);

            switch (data[ctx.from.id]) {
                case "admin":
                    ctx.telegram.sendMessage(process.env.ADMIN_CHAT_ID, report);
                    break;
                case "support":
                    ctx.telegram.sendMessage(process.env.NISSENGER_CHAT_ID, report);
                    break;
            }

            data[ctx.from.id] = undefined;

            ctx.reply("Отправили! Тебе скоро ответят 🕑", {
                reply_markup: {
                    one_time_keyboard: true,
                    resize_keyboard: true,
                    inline_keyboard: [
                        [{text:"🏫 Написать в Администрацию 🏫", callback_data: "administration"}],
                        [{text:"🤖 Написать в Тех. Поддержку 🤖", callback_data: "technical support"}]
                    ]
                }
            });
        }
    }
});

bot.launch();
