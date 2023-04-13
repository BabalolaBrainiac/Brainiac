import { OpenAI, PromptTemplate } from "langchain";
import { initializeAgentExecutor } from "langchain/agents";
import { CallbackManager } from "langchain/callbacks";
import { ConversationChain, LLMChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";
import { Calculator } from "langchain/tools/calculator";
import {
  LangChainModel,
  PROVIDER_KEYS,
} from "../config/openai/openAiConfig.js";
import { ICreateTemplate } from "./prompts_templates.js";

const tools = [PROVIDER_KEYS.SERPI_API_KEY, new Calculator()];

export class Chain {
  async createSimpleChain(input: ICreateTemplate) {
    const template = `${input.query} ${input.option}?`;
    const formatObject = new Map();
    const prompt = new PromptTemplate({
      template: template,
      inputVariables: [`${input.option}`],
    });

    const chain = new LLMChain({ llm: LangChainModel, prompt: prompt });

    formatObject.set(input.option, input.value);

    const res = await chain.call(formatObject);
    console.log(res);
  }

  async createUserInputChain(input: string) {
    const executor = await initializeAgentExecutor(tools, LangChainModel);
    const result = await executor.call({ input });
    console.log(`Got output ${result.output}`);
  }

  async createChat(input: string) {
    const memory = new BufferMemory();
    const chain = new ConversationChain({
      llm: LangChainModel,
      memory: memory,
    });
    const res1 = await chain.call({ input });
    console.log(res1);
  }

  async createStream(input: string) {
    const chat = new OpenAI({
      streaming: true,
      callbackManager: CallbackManager.fromHandlers({
        async handleLLMNewToken(token: string) {
          process.stdout.write(token);
        },
      }),
    });

    await chat.call(input);
  }
}
