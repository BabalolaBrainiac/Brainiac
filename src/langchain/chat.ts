import { LLMChain } from "langchain";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { IChatMessage } from "../interfaces/IChatMessage.js";
import {
  IChatResponse,
  iMultipleChatResponse,
} from "../interfaces/IChatResponse.js";
import { IPromptTemplate } from "../interfaces/IPromptTemplate.js";

const BrainiacChat = new ChatOpenAI({ temperature: 0 });

const llmChain = async (inputTemplate: unknown) => {
  return new LLMChain({
    prompt: inputTemplate,
    llm: BrainiacChat,
  });
};

export class Chat {
  async basicChat(input: IChatMessage): Promise<IChatResponse> {
    try {
      const response = await BrainiacChat.call([
        new HumanChatMessage(input.humanChatMessage),
      ]);
      console.log(response);
      return response.text;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async multipleChat(input: IChatMessage): Promise<IChatResponse> {
    try {
      const response = await BrainiacChat.call([
        new SystemChatMessage(input.systemChatMessage),
        new HumanChatMessage(input.humanChatMessage),
      ]);
      console.log(response);
      return response.text;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async multipleChatCompletions(
    input: IChatMessage[],
    instance: number
  ): Promise<iMultipleChatResponse[]> {
    let responses;

    try {
      for (let i = 0; i <= instance; i++) {
        responses = await BrainiacChat.generate([
          [
            new SystemChatMessage(input[i].systemChatMessage),
            new HumanChatMessage(input[i].humanChatMessage),
          ],
        ]);
      }
      console.log(responses);
      return <iMultipleChatResponse[]>responses;
    } catch (e) {
      return e;
    }
  }

  async chatPrompt(input: IPromptTemplate) {
    try {
      const chatTemplate = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
          `${input.systemPrompt.systemFunction}. These keywords are to help you more specifically and accurately do this.
            {keywords}`
        ),
        HumanMessagePromptTemplate.fromTemplate(input.query),
      ]);

      const response = await BrainiacChat.generatePrompt([
        await chatTemplate.formatPromptValue({
          keywords: input.input,
          text: input.query,
        }),
      ]);

      console.log(response);
      return <iMultipleChatResponse>response;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async llmChainChatPrompt(input: IPromptTemplate, isFirst: boolean) {
    let llmChainResponse;
    try {
      const chatTemplate = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
          `${input.systemPrompt.systemFunction}. These keywords are to help you more specifically and accurately do this.
            {keywords}`
        ),
        HumanMessagePromptTemplate.fromTemplate(input.query),
      ]);
      const chain = await llmChain(chatTemplate);

      if (isFirst) {
        llmChainResponse = await chain.call({
          keywords: input.input,
          text: input.query,
        });
      }

      llmChainResponse = await chain.call(input.query);

      console.log(llmChainResponse);
      return llmChainResponse;
    } catch (err) {}
  }
}
