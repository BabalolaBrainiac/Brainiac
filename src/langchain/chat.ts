import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

const chat = new ChatOpenAI({ temperature: 0 });

export class Chat {

    async basicChat(input: string) {
        const response = await chat.call([
            new HumanChatMessage(input),
        ]);
        console.log(response);
    }


}