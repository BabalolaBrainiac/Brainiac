import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

const brainiacBot: Telegraf<Context<Update>> = new Telegraf(process.env.BRAINIAC_BOT_TOKEN as string);

