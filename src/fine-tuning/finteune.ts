import { text2JsonlFile,  FileData, FilePurpose } from '@dalenguyen/openai'
import { Brainiac } from '../commands.js'
import { IUploadFileTypeIJsonUploadFile } from '../interfaces/index.js'


export const FinetuneOperation = {
  saveTextToJSONL(data: FileData[]) {
    // const data: FileData[] = [
    //   {
    //     text: 'This is first sentence. The is second sentence',
    //   },
    // ]
    const savedFile = text2JsonlFile({ data })
  },

  upload(file: FileData) {
    const data: any = ""
    const filedata = {
      file: File,
      purpose: FilePurpose.Answers,
    }
    Brainiac.createFile(data, filedata.purpose)
      .then((res) => console.log(res))
      .catch((error) => console.error(error))
  },

  deleteFile(file: IUploadFileTypeIJsonUploadFile) {
    Brainiac
      .deleteFile(<string>file.fileId)
      .then((res) => console.log(res))
      .catch((error) => console.error(error))
  },

  prepareFineTuneData(data: FileData[]) {
    // const data: FileData[] =
      // [
    //   {
    //     prompt: 'How about return or refund policy?',
    //     completion: 'Due to the nature of digital products, which cannot be returned, we will not offer any refunds.',
    //   },
    //   {
    //     prompt: 'How can i see the reviews?',
    //     completion: 'There is no review at this moment',
    //   },
    // ]
    const savedFile = text2JsonlFile({ data, purpose: FilePurpose.Finetune })

  },

  listUploads() {
    Brainiac
      .listFiles()
      .then((res) => console.log(res))
      .catch((error) => console.error(error))
  },

  listFineTunes() {
    Brainiac
      .listFineTunes()
      .then((res) => {
        console.log(res)
        return res
      })
      .catch((error) => console.error(error))
  },

  createFineTune(file: IUploadFileTypeIJsonUploadFile) {
    Brainiac
      .createFineTune({ training_file: file.path })
      .then((res) => {
        console.log(res)
        return res
      })
      .catch((error) => console.error(error))
  },

  getFineTune(fineTuneId: string) {
    Brainiac
      .retrieveFineTune(fineTuneId)
      .then((res) => console.log(res))
      .catch((error) => console.error(error))
  }

}
