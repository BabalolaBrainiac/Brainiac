
import axios from 'axios'
import { IPrompt } from '../interfaces/IPrompt.js'

const COMPLETIONS_URL ='https://api.openai.com/v1/completions'
export class Request  {

  headers = {
    Authorization: `Bearer ${process.env.OPENAPI_API_KEY}`
  }
  async queryBrainiac(prompt: IPrompt) {
    return await axios.post(COMPLETIONS_URL, prompt, {
      headers: this.headers
    })
  }
}