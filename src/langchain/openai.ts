import dotenv from "dotenv";
import { OpenAI } from "langchain/llms/openai";

dotenv.config();

export const Openai = {
  async RunBasicCommand(question: string) {
    console.log(process.env.OPENAI_API_KEY);

    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.1,
    });
    return await model
      .call(question)
      .then((response: any): unknown => {
        console.log(response.response.data);

        return response.response.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  },
};
