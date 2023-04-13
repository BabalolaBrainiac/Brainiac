import { PromptTemplate } from "langchain/prompts";

export const PromptTemplates = {
  async run(input: ICreateTemplate) {
    // const template = "What is a good name for a company that makes {product}?";
    const template = `${input.query} ${input.option}?`;
    const formatObject = new Map();

    const prompt = new PromptTemplate({
      template: template,
      inputVariables: [`${input.option}`],
    });

    formatObject.set(input.option, input.value);
    const res = await prompt.format(formatObject);
  },

  async createPromptTemplate(iCreateTemplate: ICreateTemplate) {
    try {
      const formatOptions = new Map();

      const newPrompt = new PromptTemplate({
        template: iCreateTemplate.query,
        inputVariables: iCreateTemplate.option,
      });

      formatOptions.set(iCreateTemplate.option, iCreateTemplate.value);
      return await newPrompt.format(formatOptions);
    } catch (err) {
      return err;
    }
  },
};

export type ICreateTemplate = {
  query: string;
  option: string;
  value: string;
};
