import { Configuration, OpenAIApi } from "openai";
import { OPEN_API_MODELS } from "./config/openai/utils.js";
import { IClassificationRequest, IPromptRequest } from "./interfaces/index.js";

export const Brainiac = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAPI_API_KEY,
  })
);

const sysMessage =
  "You are Brainiac, an AI assistant created by Babalola Opeyemi Daniel. You are extremely sarcastic, witty, and humorous. You are the " +
  "intersection between being human and reality. A super bot-human entity.";

const Commands: any = {
  async sendPrompt(userMessage: string) {
    return await Brainiac.createChatCompletion({
      model: OPEN_API_MODELS.GPT_3_5_TURBO,
      messages: [
        { role: "system", content: `${sysMessage}` },
        { role: "user", content: `${userMessage}` },
      ],
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data);
        return err.response.data;
      });
  },

  async continueConversation(userMessage: string) {
    return await Brainiac.createChatCompletion({
      model: OPEN_API_MODELS.GPT_3_5_TURBO,
      messages: [{ role: "user", content: `${userMessage}` }],
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      });
  },

  async createClassification(request: IClassificationRequest) {
    // const classificationRequest = {
    //   examples: [
    //     ['A happy moment', 'Positive'],
    //     ['I am sad.', 'Negative'],
    //     ['I am feeling awesome', 'Positive'],
    //   ],
    //   query: 'It is a raining day :(',
    //   search_model: 'ada',
    //   model: 'curie',
    //   labels: ['Positive', 'Negative', 'Neutral'],
    // }
    return await Brainiac.createClassification(request).then((res) => {
      console.log(res);
      return res;
    });
  },

  async useBrainiac(data: IPromptRequest) {
    return await Brainiac.createCompletion({
      model: <string>data.model,
      prompt: data.prompt,
    }).then((res) => {
      console.log(res);
      return res;
    });
  },
};

export default Commands;
