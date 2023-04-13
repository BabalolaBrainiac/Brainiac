import dotenv from "dotenv";
import { OpenAI } from "langchain";
import { SerpAPI } from "langchain/tools";
import { Configuration, OpenAIApi } from "openai";
import * as process from "process";

dotenv.config();

export const OpenAIConfiguration = {
  async config() {
    return new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAPI_API_KEY,
      })
    );
  },
};

export const PROVIDER_KEYS = {
  SERPI_API_KEY: new SerpAPI(),
};

export const LangChainModel = new OpenAI({
  openAIApiKey: process.env.OPENAPI_API_KEY,
  temperature: 0.9,
});
