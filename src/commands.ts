import express from "express";
import { Configuration, OpenAIApi } from "openai";
import { ApplicationConfiguration } from "./config/appConfig.js"
import { OpenAIConfiguration } from "./config/openai/openAiConfig.js"
import { Roles } from "./enums/roles.js";
import { IClassificationRequest, IPromptRequest } from "./interfaces/index.js";
export const Brainiac = new OpenAIApi(
  new Configuration({
    apiKey: "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",
  })
);

const sysMessage = "You are Brainiac, an AI assistant created by Babalola Opeyemi Daniel. You are extremely sarcastic, witty, and humorous. You are the " +
  "intersection between being human and reality. A super bot-human entity."
export const Commands = {
  async sendPrompt(userMessage: string) {
    console.log(process.env.OPENAPI_API_KEY)
    return await Brainiac.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", content: `${sysMessage}` },
        { "role": "user", "content": `${userMessage}` },
      ],
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return err
    })
  },

  async continueConversation(userMessage: string) {
    console.log(process.env.OPENAPI_API_KEY)
    return await Brainiac.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "user", "content": `${userMessage}` },
      ],
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return err
    })
  },

  async createClassification(request: IClassificationRequest) {

    const classificationRequest = {
      examples: [
        ['A happy moment', 'Positive'],
        ['I am sad.', 'Negative'],
        ['I am feeling awesome', 'Positive'],
      ],
      query: 'It is a raining day :(',
      search_model: 'ada',
      model: 'curie',
      labels: ['Positive', 'Negative', 'Neutral'],
    }
    await Brainiac.createClassification(request).then((res) => {
      console.log(res)
      return res
    })
  },

  async useBrainiac(data: IPromptRequest) {
    return await Brainiac.createCompletion({
      model: <string>data.model,
      prompt: data.prompt,
    });
  },

}