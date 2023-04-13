export interface IPromptTemplate {
  input: Record<string, any>;
  output: string;
  query: string;
  systemPrompt: {
    systemFunction: string;
    keywords?: Record<string, any>;
  };
}
