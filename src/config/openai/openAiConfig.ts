import {OpenAI} from "langchain";
import { Configuration, OpenAIApi } from "openai";
import * as process from "process";
import dotenv from 'dotenv'

dotenv.config()

export const OpenAIConfiguration = {
  async config(openAIAPiKey: string) {
    return new OpenAIApi(
      new Configuration({
        apiKey: openAIAPiKey,
      })
    );
  },
};

export const LangChainModel = new OpenAI({ openAIApiKey: "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", temperature: 0.9 });