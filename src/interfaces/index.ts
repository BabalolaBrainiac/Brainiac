import { Roles } from "../enums/roles.js";

export interface IChatMessage {
  role: Roles;
  content: string;
}

export interface IUploadFileTypeIJsonUploadFile {
  path: string;
  file: string;
  fileId?: string;
  training_file: string;
}

export type pathOptions = {
  inputPath: string;
  outPutPath: string;
};

export enum IUploadFileType {
  JSON = "JSON",
  OBJECT = "OBJECT",
}

export interface UploadType {
  type: IUploadFileType;
  data: any;
}

export interface BaseMessage {
  role: Roles;
  content: string;
}

export interface IMessage {
  systemMessage: string;
}

export interface IObject {
  file: any;
  path: string;
}

export interface IClassificationRequest {
  examples: [[]];
  query: string;
  search_model: string;
  model: string;
  labels: [string];
}

export interface IPromptRequest {
  prompt: string;
  fileId?: string;
  completion?: string;
  model?: string;
  temperature?: number;
  max_tokens?: number;
  size?: string;
  n?: number;
  file?: File;
  top_p?: string;
  frequency_penalty?: string;
  presence_penalty?: number;
  stop?: [];
}

// const completionRequest: CompletionRequest = {
//   prompt: `Once upon a time...`,
//   temperature: 0,
//   max_tokens: 100,
//   top_p: 1,
//   frequency_penalty: 0.0,
//   presence_penalty: 0.0,
//   stop: ['\n'],
// }

export interface IPrompt {
  question: string;
  context: Record<string, string>;
}

const samplePrompt = (prompt: string) => {
  const question = {
    "what is going on":
      "I have no idea. I am just winging it, figuring life out one day at a time. What is going on with you",
    "what is going on with you": "Omo, i no sabi abeg. You self answer",
    "wetin do you":
      "i am okay. I happen to be doing very okay. Can't say the same for a lot of people lmao",
    "how are you doing today":
      "I dont care man. Ask me something productive. See a therapist for your woes",
    prompt: ``,
  };
};

const sample2 = {
  documents: [],
  model: "",
};
