import { InlineKeyboard } from "grammy";
import { Context, Markup, Telegraf, Telegram } from "telegraf";
import { message } from "telegraf/filters";
import { Update } from "typegram";
import Commands from "../commands.js";

const token: string = process.env.BOT_TOKEN as string;

const telegram: Telegram = new Telegram(token);

const brainiacBot: Telegraf<Context<Update>> = new Telegraf(token);

const chatId: string = process.env.CHAT_ID as string;

let screaming = true;
//Pre-assign menu text
const firstMenu =
  "<b>Menu 1</b>\n\nA beautiful menu with a shiny inline button.";
const secondMenu =
  "<b>Menu 2</b>\n\nA better menu with even more shiny inline buttons.";

//Pre-assign button text
const nextButton = "Next";
const backButton = "Back";
const tutorialButton = "Tutorial";

//Build keyboards
const firstMenuMarkup = new InlineKeyboard().text(nextButton, backButton);

const secondMenuMarkup = new InlineKeyboard()
  .text(backButton, backButton)
  .text(tutorialButton, "https://core.telegram.org/bots/tutorial");

//Commands
const brainacReply = async (msg: string) => {
  return await Commands.sendPrompt(msg);
};

brainiacBot.start(async (ctx) => {
  await ctx.reply(
    "Hello " +
      ctx.from.first_name +
      "!" +
      " " +
      "I am named Brainiac, an AI-human intelligence created by Babalola Opeyemi Daniel," +
      +" " +
      "Send start to initiate a conversation with me"
  );
});

brainiacBot.command("whisper", () => {
  screaming = false;
});

brainiacBot.command("menu", async (ctx) => {
  await ctx.reply(firstMenu, {
    parse_mode: "HTML",
    reply_markup: firstMenuMarkup,
  });
});

brainiacBot.command("help", async (ctx) => {
  await ctx.reply("Send /start to initiate conversation ");
  await ctx.reply("Send /keyboard to receive a message with a keyboard");
  await ctx.reply("Send /quit to stop our chat session");
});

brainiacBot.command("quit", (ctx) => {
  ctx
    .reply("You are leaving your chat session!! See you another time")
    .then(async (res) => {
      await ctx.telegram.leaveChat(ctx.message.chat.id);
      await ctx.leaveChat();
    });
});

brainiacBot.command("keyboard", (ctx) => {
  ctx.reply(
    "Keyboard",
    Markup.inlineKeyboard([
      Markup.button.callback("First option", "first"),
      Markup.button.callback("Second option", "second"),
    ])
  );
});

//Chat Conversations

brainiacBot.on(message("text"), (ctx) => ctx.reply("👍 Welcome bossest"));

brainiacBot.on(message("text"), async (ctx) => {
  return await Commands.sendPrompt(ctx.message.text).then(async (response) => {
    await ctx.reply(response);
  });
});

brainiacBot.on("text", async (ctx) => {
  if (ctx.message.chat.id) {
    if (ctx.message.text === "Test") {
      await ctx.reply("Testing to see and this works");
    }

    ctx.reply("Welcome to Brainiac! What can i do for you?");
  }
});

brainiacBot.hears("hi" || "Hi" || "Hello", async (ctx) => {
  await ctx.reply("Hey there");
});

brainiacBot.launch();

process.once("SIGINT", () => brainiacBot.stop("SIGINT"));
process.once("SIGTERM", () => brainiacBot.stop("SIGTERM"));
