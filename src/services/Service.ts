import { CreateTrainingInput } from "../fine-tuning/createTrainingInput.js"
import { IJsonUploadFile } from "../interfaces/IJsonUploadFile.js"
import { IObject } from "../interfaces/IObject.js"



export const Service = {
  async uploadTrainingFileJSON(file: IJsonUploadFile) {
    return await CreateTrainingInput.fromJSON(file)

  },

  async addTrainingFileObject(file: IObject) {

    return await CreateTrainingInput.fromObject(file)
  },

  sendTrainingFileToAI() {
    
  }

}