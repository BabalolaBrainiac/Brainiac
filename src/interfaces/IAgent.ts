export class AgentStep {
  action: AgentAction;
  observation: string;
}

export class AgentAction {
  toolName: string; // Tool.name
  toolFn: string; // Tool.call argument
}

export class AgentFinish {
  returnValues: object;
}

// export interface Agent {
//   plan(steps: AgentStep[], inputs: object): Promise<AgentAction | AgentFinish>;
// }

export class Agent {
  private readonly agent: Agent;

  async plan(
    steps: AgentStep[],
    inputs: object
  ): Promise<AgentAction | AgentFinish> {
    return await this.agent.plan(steps, inputs);
  }
}
