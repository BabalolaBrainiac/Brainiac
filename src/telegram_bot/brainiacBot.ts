import { Context, Markup, Telegraf, Telegram } from 'telegraf';
import { Update } from 'typegram';
import { Commands } from '../commands.js';

export const brainiacBot: Telegraf<Context<Update>> = new Telegraf(process.env.BRAINIAC_BOT_TOKEN as string);

const brainacReply = async (msg: string) => {
  return await Commands.sendPrompt(msg)
}

brainiacBot.start((ctx) => {
  ctx.reply('Hello ' + ctx.from.first_name + '!' + 'I am named Brainiac, an AI-human intelligence created by Babalola Opeyemi Daniel,' +
    'Send start to initiate a conversation with me');
});
brainiacBot.help((ctx) => {
  ctx.reply('Send /start to initiate conversation ');
  ctx.reply('Send /keyboard to receive a message with a keyboard');
  ctx.reply('Send /quit to stop our chat session');
});
brainiacBot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);
// Context shortcut
  ctx.leaveChat();
});
brainiacBot.command('keyboard', (ctx) => {
  ctx.reply(
    'Keyboard',
    Markup.inlineKeyboard([
      Markup.button.callback('First option', 'first'),
      Markup.button.callback('Second option', 'second'),
    ])
  );
});

brainiacBot.on('text', (ctx) => {
  ctx.reply(
    'You choose the ' +
    (ctx.message.text === 'first' ? 'First' : 'Second') +
    ' Option!'
  );
});

brainiacBot.command('keyboard', (ctx) => {
  ctx.reply(
    'Keyboard',
    Markup.inlineKeyboard([
      Markup.button.callback('First option', 'first'),
      Markup.button.callback('Second option', 'second'),
    ])
  );
});

const welcome = ["Hi", "Hello", "Hey", "Whatsup", "Heyy", "Heyyy"]

brainiacBot.on('text', (ctx) => {
  const res =  brainacReply(ctx.message.text)
  let welcomemsg;
  for(let i = 0; i < welcome.length; i ++) {
      ctx.reply(
        (ctx.message.text === welcome[i] ? welcomemsg : res) + ""
      );
  }
})

brainiacBot.hears('hi' || "Hi" || "Hello", (ctx) => ctx.reply('Hey there'));

brainiacBot.on('text', async (ctx) => {
  if (ctx.message.chat.id) {

      ctx.reply(
        'You choose the ' +
        (ctx.message.text === 'first' ? 'First' : 'Second') +
        ' Option!'
      );
  }
});