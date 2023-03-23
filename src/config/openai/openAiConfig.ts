import { Configuration, OpenAIApi } from "openai";

export const OpenAIConfiguration = {
  async config(openAIAPiKey: string) {
    return new OpenAIApi(
      new Configuration({
        apiKey: openAIAPiKey,
      })
    );
  },
};
