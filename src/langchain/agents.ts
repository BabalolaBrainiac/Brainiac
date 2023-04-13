import { ChatAgent } from "langchain/agents";
import process from "process";
import { Agent, AgentFinish, AgentStep } from "../interfaces/IAgent.js";

const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: "Austin,Texas,United States",
    hl: "en",
    gl: "us",
  }),
];

class AgentExecutor {
  private readonly agent: Agent;

  async run(inputs: object) {
    let steps: AgentStep[] = [];
    while (true) {
      const step: any = await this.agent.plan(steps, inputs);
      if (step instanceof AgentFinish) {
        return step.returnValues;
      }
      steps.push(step);
    }
  }

  async runExecutor(query: string) {
    // Create the agent from the chat model and the tools
    const agent = ChatAgent.fromLLMAndTools(new ChatOpenAI(), tools);

    // Create an executor, which calls to the agent until an answer is found
    const executor = AgentExecutor.fromAgentAndTools({ agent, tools });

    const executorRes = await executor.run(query);
    console.log(executorRes);
    return executorRes;
  }
}
