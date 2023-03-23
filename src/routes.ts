import express, { Router } from "express";
import { Commands } from "./commands.js";
import { NextFunction, Request, Response } from "express";
import { FinetuneOperation } from "./fine-tuning/finteune.js";

const router: Router = express.Router();

router.post(
  "/send",
  async (req: Request, res: Response) => {
    const { userMessage }: any = req.body
    const data = await Commands.sendPrompt(userMessage)
    return res.send(data)
  }
);

router.post("/upload", (req: Request, res: Response) => {
  console.log("upload")
})

router.post("/prepare", (req: Request, res: Response) => {
  console.log("prepare")
})

router.post("/prepare", async (req: Request, res: Response) => {
  const fileData = req.body
 const data = await FinetuneOperation.saveTextToJSONL(fileData)
  return res.send(data)

})


router.use((req, res) => {
  return res.status(404).json({
    message: "The route your are calling does not exist",
    error: {
      status: 404
    }
  });
})
export default router